import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensajeError: any;
  model: any = {};
  loading = false;
  returnUrl: string;
  isSubmitted: any = false;

//  message: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private renderer: Renderer2

  ) { }

  ngOnInit() {

     // this.model.username = 'Tiagoxtg@gmail.com';
     // this.model.password = '484gome.';

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    console.log('this.returnUrl: ', this.returnUrl);
  }

  login(): void {
    this.loading = true;
    if(this.model.username=='admin'&&this.model.password=='admin'){
         //this.router.navigate([this.returnUrl]);
         localStorage.setItem('currentUser', 'admin');
         window.location.href = this.returnUrl;
    }else{
         this.mensajeError='Usuario o contraseña no son correctos';
         this.loading = false;
    }
    /*this.authenticationService.login(this.model.username, this.model.password)
      .then(data => {
        console.log('login.component.then: ', data);
        console.log('login.component.this.returnUrl: ', this.returnUrl);

        if ( data && data['status'] && data['status'] == 'EXITO' ) {
          //this.router.navigate([this.returnUrl]);
          window.location.href = this.returnUrl;
        } else {
          this.mensajeError = data['mensaje'];
        }

      })
      .catch(error => {
        console.log('login.component.error', error);
        this.loading = false;
        }
      );*/
  }

}
