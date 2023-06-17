import { Component, OnInit, HostListener } from '@angular/core';
import { resize, checkHeight } from "@root/utils/resize";


@Component({
  selector: 'edex-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
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
