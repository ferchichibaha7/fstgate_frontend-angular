import { RouteGuardService } from './Services/route-guard.service';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[RouteGuardService]  }, // canActivate, RouteGuardService
  { path: 'login', component: LoginComponent},
  { path: ':username', component: ProfileComponent , canActivate:[RouteGuardService]},
  { path: 'signup', component: SignupComponent},
  { path: '**', component: PageNotFoundComponent, canActivate:[RouteGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
