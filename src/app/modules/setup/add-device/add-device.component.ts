import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'edex-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder, private dialogRef: MatDialogRef<AddDeviceComponent>
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      manufacturer: ['', [Validators.required]],
      key:['', [Validators.required]]
  })
  }

  submit() {
      if(this.formGroup.valid) {

      }
  }

  cancel() {
      this.dialogRef.close()
  }

}
