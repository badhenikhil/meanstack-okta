import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { LoginService } from '../login.service';
import { OktaAuthStateService } from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import { AuthState } from '@okta/okta-auth-js';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: any = [];
  apiResponse: string = '';
  currentUser: any = null;
  public name$!: Observable<string>;
  heroes: Hero[] = [];
  ngOnInit(): void {
    //this.getHeroes();
    this.name$ = this._oktaAuthStateService.authState$.pipe(
      filter(
        (authState: AuthState) => !!authState && !!authState.isAuthenticated
      ),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
    this.getApiResponse();
  }
  constructor(
    // private heroService: HeroService,
    // private loginService: LoginService,
    private _router: Router,
    private _oktaAuthStateService: OktaAuthStateService,
    private _backendService: BackendService
  ) {}
  // getHeroes() {
  //   this.heroService
  //     .getHeroes()
  //     .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  // }
  // getUsers() {
  //   //this.loginService.check().subscribe((users) => (this.users = users));
  // }
  getApiResponse() {
    this._backendService.getResponse().subscribe(() => this.apiResponse);
  }
  logout() {
    localStorage.removeItem('token');
    this._router.navigateByUrl('login');
  }
}
