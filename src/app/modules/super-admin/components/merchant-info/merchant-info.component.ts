import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'edex-merchant-info',
  templateUrl: './merchant-info.component.html',
  styleUrls: ['./merchant-info.component.scss']
})
export class MerchantInfoComponent implements OnInit {

  public userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public location: Location
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

}
