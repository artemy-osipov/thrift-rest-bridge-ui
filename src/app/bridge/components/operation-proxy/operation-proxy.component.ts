import { Component, Input, SimpleChanges } from '@angular/core';

import { OperationId } from 'app/bridge/shared/service.model';
import { ServicesService } from 'app/bridge/shared/services.service';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-operation-proxy',
  templateUrl: './operation-proxy.component.html',
  styleUrls: ['./operation-proxy.component.css']
})
export class OperationProxyComponent {

  @Input() opeartionId?: OperationId;
  request = new FormControl();

  constructor(
    private servicesService: ServicesService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.opeartionId && changes.opeartionId.currentValue) {
      this.fillTemplate(changes.opeartionId.currentValue);
    }
  }

  fillTemplate(opeartionId: OperationId) {
    this.servicesService.getTemplate(opeartionId)
      .pipe(
        map(data => JSON.parse(data)),
        map(data => JSON.stringify(data, null, 2))
      )
      .subscribe(
        data => this.request.setValue(data)
      );
  }
}
