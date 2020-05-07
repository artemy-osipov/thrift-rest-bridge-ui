import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JsonEditorOptions } from 'ang-jsoneditor';

import { OperationId } from 'app/bridge/shared/service.model';
import { ServicesService } from 'app/bridge/shared/services.service';

@Component({
  selector: 'app-operation-proxy',
  templateUrl: './operation-proxy.component.html',
  styleUrls: ['./operation-proxy.component.css']
})
export class OperationProxyComponent {

  @Input() opeartionId?: OperationId;

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
      'request': new FormControl('')
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.opeartionId && changes.opeartionId.currentValue) {
      this.fillForm(changes.opeartionId.currentValue);
    }
  }

  fillForm(opeartionId: OperationId) {
    this.servicesService.getTemplate(opeartionId)
      .subscribe(
        data => this.f['request'].setValue(data),
        err => this.onError()
      );
  }

  get f() {
    return this.form.controls;
  }

  proxy() {
    if (this.form.valid) {
      this.loading = true;
      this.response = "";
      const { endpoint, request } = this.form.value;
      this.servicesService.proxy(this.opeartionId!, endpoint, request)
        .subscribe(
          data => this.response = JSON.stringify(data, null, 4),
          err => this.onError(),
          () => this.loading = false
        );
    }
  }

  onError() {
    this.response = "Something went wrong :("
  }
}
