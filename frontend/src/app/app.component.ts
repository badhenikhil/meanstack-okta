import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'My App';
  backendResponse = '';
  public isAuthenticated$!: Observable<boolean>;
  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }
  constructor(
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
    private _router: Router,
    private _backendService: BackendService
  ) {
    this.backendResponse = '';
  }

  public async signIn(): Promise<void> {
    await this._oktaAuth.signInWithRedirect().then((_) => {
      this._router.navigateByUrl('profile');
    });
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }

  public testBackend() {
    this._backendService
      .getResponse()
      .subscribe(
        (data: any) => (this.backendResponse = data.message.toString())
      );
  }
}
