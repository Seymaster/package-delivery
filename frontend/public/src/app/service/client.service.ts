import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseURL:string = environment.apiBaseURL;

  constructor(private http:HttpClient) { }
  getPackage () {
   return this.http.get(`${this.baseURL}v1/package`)
  }

  createPackage () {
    return this.http.post(`${this.baseURL}v1/package`, {})
   }
}
