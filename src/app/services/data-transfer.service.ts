import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  private copyPastaBackendUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}
  sendData(data: any): Observable<any> {
    console.log('api call initiated with payload', data);
    const url = this.copyPastaBackendUrl + 'data-transfer/send-data';
    console.log('the url from the env is:', `${this.copyPastaBackendUrl}`);
    return this.http.post(url, data);
  }
  receiveData(docID: string): Observable<any> {
    const url = this.copyPastaBackendUrl + 'data-transfer/' + docID;
    console.log("the url is:",url);
    return this.http.get(url);
  }
}
