import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  constructor(private http: HttpClient) {}
  sendData(data: any): Observable<any> {
   // console.log('api call initiated with payload', data);

    const url = `${environment.apiUrl}/data-transfer/send-data`;
  //  console.log('the url from the env is:', `${environment.apiUrl}`);
    return this.http.post(url, data);
  }
  receiveData(docID: string): Observable<any> {
    const url = `${environment.apiUrl}/data-transfer/${docID}`;
   // console.log('the url from the env is:', `${environment.apiUrl}`);
    return this.http.get(url);
  }
}
