import {
  Component,
  Input,
  SimpleChanges,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { ClipboardService } from 'app/bridge/shared/clipboard.service';

import { OperationId, ProxyRequest } from 'app/bridge/shared/service.model';
import { ServicesService } from 'app/bridge/shared/services.service';
import { concat, of } from 'rxjs';
import { debounceTime, filter, first, map } from 'rxjs/operators';

@Component({
  selector: 'app-operation-proxy',
  templateUrl: './operation-proxy.component.html',
  styleUrls: ['./operation-proxy.component.css'],
})
export class OperationProxyComponent implements OnInit, OnChanges {
  @Input() operationId!: OperationId;

  form: FormGroup;
  editorOptions = new JsonEditorOptions();
  response?: string;
  loading = false;
  copiedUrl = false;

  constructor(
    private route: ActivatedRoute,
    private clipboard: ClipboardService,
    private servicesService: ServicesService
  ) {
    this.editorOptions.mode = 'code';
    this.editorOptions.mainMenuBar = false;

    this.form = new FormGroup({
      endpoint: new FormControl('', [Validators.required]),
      body: new FormControl(''),
    });
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((data: ProxyRequest) =>
        this.servicesService.persistProxyRequest(this.operationId, data)
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.operationId && changes.operationId.currentValue) {
      this.clearForm();
      this.fillForm();
    }
  }

  fillForm() {
    concat(
      of(this.route.snapshot.queryParams.form).pipe(
        filter(param => param !== undefined),
        map(formEncoded => this.parseForm(formEncoded))
      ),
      this.servicesService.getProxyRequest(this.operationId)
    )
      .pipe(first())
      .subscribe(
        (data) => {
          this.f['endpoint'].setValue(data.endpoint);
          this.f['body'].setValue(data.body);
        },
        (error) => this.onError(error)
      );
  }

  private parseForm(queryParam: string): ProxyRequest {
    return JSON.parse(atob(queryParam));
  }

  resetForm() {
    this.servicesService.getTemplate(this.operationId).subscribe(
      (template) => this.f['body'].setValue(template),
      (error) => this.onError(error)
    );
  }

  clearForm() {
    this.f['endpoint'].setValue('');
    this.f['body'].setValue('{}');
    this.response = '';
  }

  get f() {
    return this.form.controls;
  }

  proxy() {
    if (this.form.valid) {
      this.loading = true;
      this.response = '';
      const value = this.form.value as ProxyRequest;
      this.servicesService.proxy(this.operationId, value).subscribe(
        (data) => (this.response = JSON.stringify(data, null, 4)),
        (ex) => (this.response = JSON.stringify(ex.error, null, 4)),
        () => (this.loading = false)
      );
    }
  }

  copyPersistentUrl() {
    const formParam = btoa(JSON.stringify(this.form.value));
    this.clipboard.copyText(window.location.href + '&form=' + formParam);
    this.copiedUrl = true;
    setTimeout(() => (this.copiedUrl = false), 300);
  }

  onError(error: any) {
    this.response = 'Something went wrong :(';
    if (error) {
      console.log('error: ' + error);
    }
  }
}
