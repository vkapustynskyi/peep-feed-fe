import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {SignUpPageComponent} from "./sign-up-page/sign-up-page.component";
import {AuthGuard} from "./_guards/AuthGuard";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {AdminPageComponent} from "./admin-page/admin-page.component";

const routes: Routes = [
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/:userId', component: UserProfileComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'sign-up', component: SignUpPageComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'bad-gateway', loadChildren: () => import('./bad-gateway/bad-gateway.module').then((m) => m.BadGatewayModule)},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
