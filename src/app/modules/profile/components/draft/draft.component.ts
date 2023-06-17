import { Component, OnInit, OnDestroy } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { select, Store } from '@ngrx/store';
import * as loginReducers from '@modules/login/reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edex-settings-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class DraftComponent implements OnInit, OnDestroy {
  public userRole='';
  public mytitle ='';
  public stepContents = [
    {
      title: this.mytitle,
      icon: 'important_devices',
      items: [
        {
          content: 'Information completed by merchant',
          type: 'completed'
        },
        {
          content: 'Being assessed by admin',
          type: 'assessed'
        },
        {
          content: 'Approved by admin',
          type: 'approved'
        },
        {
          content: 'Rejected by admin',
          type: 'rejected'
        }
      ]
    },
    {
      title: 'Checking & Validation',
      icon: 'offline_pin',
      items: [
        {
          content: 'Information completed by merchant',
          type: 'completed'
        },
        {
          content: 'Being assessed by admin',
          type: 'assessed'
        },
        {
          content: 'Approved by admin',
          type: 'approved'
        },
        {
          content: 'Rejected by admin',
          type: 'rejected'
        }
      ]
    },
    {
      title: 'Connection',
      icon: 'power',
      items: [
        {
          content: 'Information completed by merchant',
          type: 'completed'
        },
        {
          content: 'Being assessed by admin',
          type: 'assessed'
        },
        {
          content: 'Approved by admin',
          type: 'approved'
        },
        {
          content: 'Rejected by admin',
          type: 'rejected'
        }
      ]
    }
  ];

  public userId: string;
  public user$ = this.store.pipe(select(loginReducers.getUser));

  private userSub: Subscription;

  constructor(
    private store: Store<loginReducers.State>
  ) { }

  ngOnInit() {
    this.userSub = this.user$.subscribe(user => {
      if(user){
        if(user.role == 'User'){
          this.mytitle='My Info';
        }else{
          this.mytitle='My Company Info';
        }
        console.log(this.mytitle, "this.mytitle")
      }
      this.userId = user._id;
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
