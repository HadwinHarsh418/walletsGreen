import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as merchantReducers from '../../../reducers';
import { MerchantDetailService } from '@modules/profile/services/merchant-detail.service';
import { UpdateMerchantDetailSuccess } from '@modules/profile/actions/merchant-detail.actions';
import { MERCHANT_COMMENT_TYPE } from '@root/resources/enums/merchant-comment-types.enum';
import { IMerchantComment } from '@interfaces/merchant-comment.interface';
import { MessengerService } from '@modules/messenger/messenger.service';

export interface CommentDialogData {
  merchantId: string;
  commentType: MERCHANT_COMMENT_TYPE;
  comments: IMerchantComment[];
}

@Component({
  selector: 'edex-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.scss']
})
export class AddCommentDialogComponent implements OnInit {

  public comment = '';
  public loading = false;

  constructor(
    private store: Store<merchantReducers.State>,
    private merchantDetailService: MerchantDetailService,
    private msgr: MessengerService,
    public dialogRef: MatDialogRef<AddCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentDialogData,
  ) { }

  handleClose(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.loading = true;
    this.merchantDetailService.addComment(
      this.data.merchantId,
      this.data.commentType,
      this.comment
    ).subscribe(
      (res) => {
        this.msgr.message('Comment is added successfully.');
        this.store.dispatch((new UpdateMerchantDetailSuccess(res)));
        this.loading = false;
        this.handleClose();
      },
      (err) => {
        this.msgr.error('Failed to add a comment');
        this.loading = false;
      }
    );
  }

  ngOnInit() {
  }

}
