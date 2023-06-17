import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddDeviceComponent } from '../add-device/add-device.component';

@Component({
  selector: 'edex-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  data: any[] = [];
  displayedColumns: string[] = ['name', 'manufacturer', 'key'];
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  newDevice() {
    const dialogRef = this.dialog.open(AddDeviceComponent);
  }

}
