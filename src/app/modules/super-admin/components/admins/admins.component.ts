import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IMerchant } from '@interfaces/merchant.interface';
import { select, Store } from '@ngrx/store';
import * as adminReducer from '@modules/super-admin/reducers';
import { MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material';
import { EditAdminDialogComponent } from '@modules/super-admin/components/edit-admin-dialog/edit-admin-dialog.component';
import { AdminApiService } from '@modules/super-admin/services/admin-api.service';
import { ConfirmDialogComponent } from '@modules/shared/components/confirm-dialog/confirm-dialog.component';
import { MessengerService } from '@modules/messenger/messenger.service';
import _ from 'lodash';

@Component({
  selector: 'edex-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['contactName', 'email', 'phoneNumberCall', 'companyName', 'actions'];
  dataSource = new MatTableDataSource<IMerchant>([]);

  search = '';
  debouncedSearch;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store: Store<adminReducer.State>,
    private adminApi: AdminApiService,
    private msgr: MessengerService,
    public dialog: MatDialog,
  ) {
    this.debouncedSearch = _.debounce(this.getAdmins.bind(this), 500);
  }

  ngOnInit() {
    this.getAdmins();
  }

  getAdmins() {
    this.adminApi.getAdmins({
      search: this.search,
      isDeleted: false
    }).subscribe(merchants => {
      this.dataSource = new MatTableDataSource<IMerchant>(merchants);
      this.dataSource.paginator = this.paginator;
    });
  }

  openCreateAdminDialog() {
    const dialogRef = this.dialog.open(EditAdminDialogComponent, { data: {} });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAdmins();
      }
    });

  }

  ngOnDestroy() {
  }

  editAdmin(event: Event, admin: IMerchant) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(EditAdminDialogComponent, {
      data: {
        merchant: admin,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAdmins();
      }
    });
  }

  deleteAdmin(event: Event, admin: IMerchant) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        text: 'Are you sure to remove this admin?'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminApi.deleteAdmin(admin._id).subscribe(
          (res) => {
            this.getAdmins();
          },
          (err) => {
            this.msgr.error(err.message);
          }
        );
      }
    });
  }
}
