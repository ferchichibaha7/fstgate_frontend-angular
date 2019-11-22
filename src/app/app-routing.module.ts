
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { RouteGuardService } from './Services/route-guard.service';



const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent, canActivate:[RouteGuardService]  }, // canActivate, RouteGuardService
  { path: ':username', component: ProfileComponent , canActivate:[RouteGuardService]},
  { path: '**', component: PageNotFoundComponent, canActivate:[RouteGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
