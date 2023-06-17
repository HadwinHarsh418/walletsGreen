import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '@modules/login/services/login.service';
import { MessengerService } from '@modules/messenger/messenger.service';

@Component({
  selector: 'edex-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  public token = '';
  public activated = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionApi: LoginService,
    private msgr: MessengerService,
  ) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (this.token) {
      this.sessionApi.activateAccount(this.token)
        .subscribe(
          (res) => {
            this.msgr.message('Your account is activated successfully. Please login.');
            this.activated = true;
          },
          (err) => {
            if (err.message === 'expired') {
              this.msgr.error('Token is expired. Please resend email.');
              this.activated = false;
            } else {
              this.msgr.error(err.message);
              this.router.navigate(['/merchant-signup']);
            }
          }
        );
    }
  }

  resendEmail() {
    this.sessionApi.resendActivationEmail(this.token)
      .subscribe(
        () => {
          this.msgr.message('Your request has been sent. Please check your email box.');
        },
        (err) => {
          this.msgr.error(err.message);
        }
      );
  }
}
