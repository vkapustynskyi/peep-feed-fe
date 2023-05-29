import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavMenuComponent} from "./nav-menu/nav-menu.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TokenInterceptor} from "./_interceptors/token-interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "./_interceptors/error-interceptor";
import {ApiUrlInterceptor} from "./_interceptors/api-url-interceptor";
import {HomePageComponent} from "./home-page/home-page.component";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {LoginPageComponent} from './login-page/login-page.component';
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {SignUpPageComponent} from "./sign-up-page/sign-up-page.component";
import {MatTabsModule} from "@angular/material/tabs";
import {BadGatewayRoutingModule} from "./bad-gateway/bad-gateway-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatChipsModule} from "@angular/material/chips";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AuthGuard} from "./_guards/AuthGuard";
import {MatListModule} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import { PostComponent } from './post/post.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { AdminPageComponent } from './admin-page/admin-page.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomePageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    UserProfileComponent,
    PostComponent,
    AdminPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    NgOptimizedImage,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
    MatPaginatorModule,
    MatTableModule,
    BadGatewayRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatListModule,
    FormsModule,
    MatTooltipModule,
    MatSlideToggleModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
