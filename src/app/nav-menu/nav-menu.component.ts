import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {navigationRoutes} from "../navigationRoutes";
import {AuthenticationService} from "../_services/AuthenticationService";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  constructor(private router: Router,
              public authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  public goToProfilePage(): void {
    this.router.navigate([navigationRoutes.home]);
  }

  logout() {
    this.authService.logout();
  }
}
