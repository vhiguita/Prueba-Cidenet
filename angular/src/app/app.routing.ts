import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  /*{
    path: 'forgotMyPassword',
    component: OlvideMiClaveComponent
  },*/

  // otherwise redirect to home
  {
    path: '**',
    redirectTo: 'home/dashboard'
  },
];
export const routing = RouterModule.forRoot(appRoutes);
