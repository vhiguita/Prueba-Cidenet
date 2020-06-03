import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonService} from './common.service';
import {Credencial} from '../classes/credencial';
import {AlertService} from './alert.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private commonService: CommonService
  ) { }

  /*login(login: string, clave: string): Promise<any> {

    const credencial: Credencial = new Credencial(login, clave);

    return this.http.post(this.commonService.obtenerPrefijoUrlServicio() + 'adminUser/login/', credencial)
      .toPromise()
      .then(response => {
        console.log('authentication.service.then: ', response);
        if ( response && response['estado'] && response['estado'] == 'EXITO' ) {
          localStorage.setItem('currentUser', JSON.stringify(response));
        } else {
          if (response && response['mensaje']) {
            console.log('authentication.service.then.error: ', response['mensaje']);
            this.alertService.error(response['mensaje']);
          } else {
            this.alertService.error('Error');
          }
        }
        return response;
      })
      ;
  }*/
  login(UserName: string, Password: string): Promise<any> {
    console.log(UserName);
    console.log(Password);
    //const credential: Credential = new Credential(UserName, Password);
    const credencial: Credencial = new Credencial(UserName, Password);
    console.log(credencial);
    // var param = { 'UserName' : UserName, 'Password' : Password };
    return this.http.post(this.commonService.getPrefixUrlService() + 'Service.svc/validateUser',
      JSON.stringify(credencial), {headers: {'Accept': 'application/json', 'Content-Type': 'application/json; ; charset=UTF-8'}})
      .toPromise()
      .then(obj => {
        const response = JSON.parse(obj.toString());
        if ( response && response['status'] && response['status'] === 'EXITO' ) {
          console.log('login.service.then.exito: ', response['mensaje']);
          localStorage.setItem('currentUser', JSON.stringify(response));
        } else {
          if (response && response['message']) {
            this.alertService.error(response['message']);
            console.log('login.service.then.error: ', response['message']);
          } else {
            this.alertService.error('error')
            console.log('error ');
          }
        }
        return response;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
