import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IMerchant } from '@interfaces/merchant.interface';
import { MatDialog } from '@angular/material';
import { EditAdminDialogComponent } from '@modules/super-admin/components/edit-admin-dialog/edit-admin-dialog.component';
import * as adminReducer from '@modules/super-admin/reducers';
import { ConfirmDialogComponent } from '@modules/shared/components/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';
import { GetAllMerchants } from '@modules/super-admin/actions/merchants.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {MerchantDetailService} from '@modules/super-admin/services/merchant-detail.service';
import {DeactivateMerchantDetailService} from '@modules/super-admin/services/deactivateMerchant-api.service';
import _ from 'lodash';
import { MessengerService } from '@modules/messenger/messenger.service';
@Component({
  selector: 'edex-deactivate-merchant',
  templateUrl: './deactivate-merchant.component.html',
  styleUrls: ['./deactivate-merchant.component.scss']
})
export class DeactivateMerchantComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['contactName', 'email', 'phoneNumberCall', 'companyName', 'status', 'delete','actions'];
dataSource = new MatTableDataSource<IMerchant>([]);
merchantStatusOptions = [
  { label: 'All', value: '' },
  { label: 'Web applications', value: 'web' },
  { label: 'Information upload stage', value: 'upload' },
  { label: 'Being assessed', value: 'assessed' },
  { label: 'Approved', value: 'approved' },
  { label: 'Website/POS integration Stage', value: 'integration' },
  { label: 'Live and Processing', value: 'processing' },
];

merchantStatus = '';
search = '';
debouncedFilter;

private merchantsSub: Subscription;
public merchants$ = this.store.pipe(select(adminReducer.getMerchants));

@ViewChild(MatPaginator) paginator: MatPaginator;

constructor(
  private store: Store<adminReducer.State>,
  private router: Router,
  private route: ActivatedRoute,
  private msgr: MessengerService,
  private merchantApiService: DeactivateMerchantDetailService,
  public dialog: MatDialog,
) {
  this.debouncedFilter = _.debounce(this.applyFilter.bind(this), 500);
}

ngOnInit() {
  this.route.queryParamMap.subscribe((query) => {
    this.merchantStatus = query.get('status') || '';
    this.search = query.get('search') || '';
    this.getMerchants();
  });
}

getMerchants() {
  this.merchantApiService.getMerchantDetail({
    status: this.merchantStatus,
    search: this.search,
    isDeleted: true,
  }).subscribe(
    (merchants) => {
      this.dataSource = new MatTableDataSource<IMerchant>(merchants);
      this.dataSource.paginator = this.paginator;
    },
    (err) => {

    }
  );
}

activateMerchant(event: Event, merchant: IMerchant) {
  event.stopPropagation();

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: {
      text: 'Are you sure to activate this merchant?'
    }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.merchantApiService.activateMerchant({
        id: merchant._id,
      }).subscribe(
        (data) => {
          this.getMerchants()
          this.msgr.message('Account activate successfully.')
        },
        (err) => {
          this.msgr.error('This user email is already active.');
        }
      );
    }
  });
}


applyFilter() {
  this.router.navigate(['/admin/users/merchants'], {
    queryParams: {
      status: this.merchantStatus,
      search: this.search,
    },
  }).then();
}

ngOnDestroy() {
  if (this.merchantsSub) {
    this.merchantsSub.unsubscribe();
  }
}
}
