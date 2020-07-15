import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {

  loading = false;
  returnUrl: string;
  error = '';

  public model = {
    loggedIn: false,
    user: {}
  };

  constructor(
    private socialAuthService: AuthService,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.model.user = null;
    this.socialAuthService.authState.subscribe(async (user) => {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

      console.log('trace this');
      console.log(sessionStorage.getItem('currentUser'));
      console.log(user);

      if (!user) {
        return;
      }

      this.model.user = user;
      this.model.loggedIn = (user != null);

      // Save temp token
      sessionStorage.setItem('validatingToken', user.idToken);

      // authenticationService
      if (await this.api.authentication.validateSocialUser(user)) {
        this.router.navigate([this.returnUrl]);
      }
    });
  }

  signIn(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut(true).then(result => { localStorage.clear(); });
  }

}
