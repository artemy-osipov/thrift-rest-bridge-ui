import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';

import { Service } from 'app/bridge/shared/service.model';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ServicesGateway {

  constructor(
    private http: HttpClient
  ) { }

  private url(params: string[]): string {
    return [environment.apiUrl].concat(params).join('/');
  }

  list(): Observable<Service[]> {
    return this.http
      .get<Service[]>(this.url(['services']))
      .pipe(
        tap(data => data.forEach(
          s => s.operations.sort(
            (a, b) => a.name.localeCompare(b.name)
          )
        ))
      );
  }

  getTemplate(serviceId: string, operationName: string): Observable<string> {
    return this.http
      .get<string>(this.url(['services', serviceId, 'operations', operationName, 'template']));
  }

  proxy(serviceId: string, operationName: string, endpoint: string, body: Object): Observable<Object> {
    return this.http
      .post<Object>(
        this.url(['services', serviceId, 'operations', operationName]),
        {
          endpoint,
          body
        }
      );
  }
}
