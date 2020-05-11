import { Component, Input, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JsonEditorOptions } from 'ang-jsoneditor';

import { OperationId, ProxyRequest } from 'app/bridge/shared/service.model';
import { ServicesService } from 'app/bridge/shared/services.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-operation-proxy',
  templateUrl: './operation-proxy.component.html',
  styleUrls: ['./operation-proxy.component.css']
})
export class OperationProxyComponent implements OnInit, OnChanges {

  @Input() opeartionId!: OperationId;

  form: FormGroup;
  editorOptions = new JsonEditorOptions();
  response?: string;
  loading = false;

  constructor(
    private servicesService: ServicesService
  ) {
    this.editorOptions.mode = 'code';
    this.editorOptions.mainMenuBar = false;

    this.form = new FormGroup({
      'endpoint': new FormControl('', [Validators.required]),
      'body': new FormControl('')
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      (data: ProxyRequest) =>
        this.servicesService.persistProxyRequest(this.opeartionId, data)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.opeartionId && changes.opeartionId.currentValue) {
      this.clearForm();
      this.fillForm();
    }
  }

  fillForm() {
    this.servicesService.getProxyRequest(this.opeartionId)
      .subscribe(
        data => {
          this.f['endpoint'].setValue(data.endpoint);
          this.f['body'].setValue(data.body);
        },
        _ => this.onError()
      );
  }

  resetForm() {
    this.servicesService.getTemplate(this.opeartionId)
      .subscribe(
        template => this.f['body'].setValue(template),
        _ => this.onError()
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
      this.servicesService.proxy(this.opeartionId, value)
        .subscribe(
          data => this.response = JSON.stringify(data, null, 4),
          _ => this.onError(),
          () => this.loading = false
        );
    }
  }

  onError() {
    this.response = 'Something went wrong :(';
  }
}
