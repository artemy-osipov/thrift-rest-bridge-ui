import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Service, Operation, OperationId } from 'app/bridge/shared/service.model';
import { Observable } from 'rxjs';
import { ServicesQuery } from '../../shared/services.query';
import { ServicesService } from '../../shared/services.service';
import { startWith, switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  search = new FormControl();
  services$: Observable<Service[]> = this.search.valueChanges
    .pipe(
      debounceTime(100),
      startWith(''),
      switchMap(term => this.servicesQuery.filtered(term))
    )

  @Output() selected = new EventEmitter<OperationId>();
  wasSelected?: OperationId;

  constructor(
    private servicesService: ServicesService,
    private servicesQuery: ServicesQuery
  ) { }

  ngOnInit() {
    this.servicesService.list().subscribe();
  }

  isSelected(service: Service, operation: Operation): boolean {
    return this.wasSelected
      && this.wasSelected.serviceId === service.id
      && this.wasSelected.opeartionName === operation.name
      || false;
  }

  select(service: Service, operation: Operation) {
    this.wasSelected = {
      serviceId: service.id,
      opeartionName: operation.name
    };
    this.selected.emit(this.wasSelected)
  }

}
