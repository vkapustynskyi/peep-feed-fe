import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";

const routes: Routes = [
  // {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  // {path: 'sign-up', component: SignupPageComponent},
  // {path: 'admin', component: AdminPanelComponent},
  {path: 'bad-gateway', loadChildren: () => import('./bad-gateway/bad-gateway.module').then((m) => m.BadGatewayModule)},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
