import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { startWith, switchMap, debounceTime, first } from 'rxjs/operators';

import {
  Service,
  Operation,
  OperationId,
} from 'app/bridge/shared/service.model';
import { ServicesQuery } from '../../shared/services.query';
import { ServicesService } from '../../shared/services.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  search = new FormControl();
  services$: Observable<Service[]>;

  @Output()
  selected = new EventEmitter<OperationId>();
  private selectedId?: OperationId;

  @ViewChildren('operations')
  operationElements!: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private servicesQuery: ServicesQuery
  ) {
    this.services$ = this.search.valueChanges.pipe(
      debounceTime(100),
      startWith(''),
      switchMap((term) => this.servicesQuery.filtered(term))
    );
  }

  ngOnInit() {
    this.servicesService.list().subscribe();
    let scrolled = false;
    combineLatest([this.route.queryParams, this.services$]).subscribe(
      ([params, services]) => {
        const { serviceId, operationName } = params;
        this.selectedId = this.resolveOperation(
          serviceId,
          operationName,
          services
        );
        if (this.selectedId) {
          this.selected.emit(this.selectedId);
          if (!scrolled) {
            this.scrollToOperation(this.selectedId);
            scrolled = true;
          }
        }
      }
    );
  }

  private scrollToOperation(operationId: OperationId) {
    this.operationElements.changes.pipe(first()).subscribe(() => {
      let element = this.operationElements.find(
        (el) =>
          el.nativeElement.id ==
          `${operationId.serviceId}-${operationId.operationName}`
      )?.nativeElement;
      element && this.scrollToMiddle(element);
    });
  }

  private scrollToMiddle(element: HTMLElement) {
    try {
      element.scrollIntoView({ block: 'center' });
    } catch (error) {
      console.log(error)
    }
  }

  private resolveOperation(
    serviceId: string,
    operationName: string,
    services: Service[]
  ): OperationId | undefined {
    if (serviceId && operationName) {
      const service = services.find((s) => s.id === serviceId);
      const operation =
        service && service.operations.find((o) => o.name === operationName);

      if (service && operation) {
        return {
          serviceId,
          operationName,
        };
      }
    }
    return undefined;
  }

  isSelected(service: Service, operation: Operation): boolean {
    return (
      (this.selectedId &&
        this.selectedId.serviceId === service.id &&
        this.selectedId.operationName === operation.name) ||
      false
    );
  }

  select(service: Service, operation: Operation) {
    this.selectedId = {
      serviceId: service.id,
      operationName: operation.name,
    };
    this.updateUrl();
  }

  private updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.selectedId,
    });
  }
}
