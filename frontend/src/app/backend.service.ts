import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { constants } from './constants/constant';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}
  getResponse() {
    return this.http.get(constants.getResponseUrl);
  }
}
