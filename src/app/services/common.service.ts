import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getLoginJson() {
    return this.http.get('../assets/json/login.json');
  }

  getProductDetails() {
    return this.http.get('../assets/json/productDetails.json');
  }

}
