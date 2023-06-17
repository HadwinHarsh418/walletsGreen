import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { errorCheck } from '@root/utils/error-check';
import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentApiService {

  constructor(
    private http: HttpService
  ) { }

  uploadDocument(data: FormData) {
    return this.http.post(
      `${environment.API_URL}/api/document/upload-document`,
      data,
    )
      .pipe(
        map(res => errorCheck(res)),
        map(
          res => res,
          error => { throw error; }
        )
      );
  }

  downloadDocument(document: string) {
    return this.http.get(
      `${environment.API_URL}/api/document/get-document/${document}`,
    )
      .pipe(
        map(
          res => res,
          error => { throw error; }
        )
      );
  }
}
