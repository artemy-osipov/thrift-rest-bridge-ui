import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Service } from './state/service.model';
import { Observable } from 'rxjs';
import { ServicesQuery } from './state/services.query';
import { ServicesService } from './state/services.service';
import { startWith, switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  search = new FormControl();
  services$: Observable<Service[]> = this.search.valueChanges
    .pipe(
      debounceTime(100),
      startWith(''),
      switchMap(term => this.servicesQuery.filtered(term))
    )

  constructor(
    private servicesService: ServicesService,
    private servicesQuery: ServicesQuery
  ) { }

  ngOnInit() {
    this.servicesService.list().subscribe();
  }

}
