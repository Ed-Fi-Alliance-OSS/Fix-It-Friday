import { EnvironmentService } from './environment.service';
import { Environment } from '../Models/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EnvironmentHttpService {

  constructor(private http: HttpClient, private environmentService: EnvironmentService) {
  }

  initializeApp(): Promise<any> {
    return new Promise(
      (resolve) => {
        this.http.get('assets/environment.json')
          .toPromise()
          .then((response: any) => {
              this.environmentService.environment = <Environment>response;
              resolve();
          })
      }
    );
  }
}
