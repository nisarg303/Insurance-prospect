import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBean } from '../model/form';

const url = 'http://localhost:8080/data/postData ';
@Injectable()
export class BackendApiService {

  constructor(private http: HttpClient) { }


  submitData(model: FormBean) {
    debugger;
    return this.http.post<FormBean>(url, model).subscribe( data => {
      alert('Form submitted successfully.');
    });
  }
}
