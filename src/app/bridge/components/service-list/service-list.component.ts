import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { startWith, switchMap, debounceTime } from 'rxjs/operators';

import { Service, Operation, OperationId } from 'app/bridge/shared/service.model';
import { ServicesQuery } from '../../shared/services.query';
import { ServicesService } from '../../shared/services.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  search = new FormControl();
  services$: Observable<Service[]>;

  @Output()
  selected = new EventEmitter<OperationId>();
  private selectedId?: OperationId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private servicesQuery: ServicesQuery
  ) {
    this.services$ = this.search.valueChanges
      .pipe(
        debounceTime(100),
        startWith(''),
        switchMap(term => this.servicesQuery.filtered(term))
      );
  }

  ngOnInit() {
    this.servicesService.list().subscribe();
    combineLatest([this.route.queryParams, this.services$])
      .subscribe(
        ([params, services]) => {
          const { serviceId, opeartionName } = params;

          if (serviceId && opeartionName) {
            const service = services.find(s => s.id === serviceId);
            const operation = service && service.operations.find(o => o.name === opeartionName);

            if (service && operation) {
              this.select(service, operation);
            }
          }
        }
      );
  }

  isSelected(service: Service, operation: Operation): boolean {
    return this.selectedId
      && this.selectedId.serviceId === service.id
      && this.selectedId.opeartionName === operation.name
      || false;
  }

  select(service: Service, operation: Operation) {
    this.selectedId = {
      serviceId: service.id,
      opeartionName: operation.name
    };
    this.updateUrl();
    this.selected.emit(this.selectedId);
  }

  private updateUrl() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.selectedId
      });
  }
}
