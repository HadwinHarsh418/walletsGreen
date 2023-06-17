import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastComments'
})
export class LastCommentsPipe implements PipeTransform {

  transform(comments: any[]): any {
    return comments.reverse().slice(0, 2);
  }
}
