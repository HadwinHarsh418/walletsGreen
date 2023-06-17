import { Component, OnInit, HostListener } from '@angular/core';
import { resize, checkHeight } from "@root/utils/resize";


@Component({
  selector: 'profile-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  public smallScreen = false;
  public shortHeight = false;

  constructor() {
    this.smallScreen = resize('sm') || resize('xs') || resize('md');
    this.shortHeight = checkHeight();
   }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  listenResize() {
      this.smallScreen = resize('sm') || resize('xs') || resize('md');
      this.shortHeight = checkHeight();
  }

}

