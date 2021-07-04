import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public data: any = {};
  public storageName:string = "cartinfo";
  
  constructor(private http: HttpClient) {
    this.loadStorage(); 
   }

  getLoginJson() {
    return this.http.get('../assets/json/login.json');
  }

  loadStorage(){
    let temp =  localStorage.getItem(this.storageName);
    if(temp === undefined || temp === null || temp === ''){
      this.data = {};
    }else{
      this.data = JSON.parse( temp );
    }
  }

  set(obj){
     Object.keys(obj).forEach( (key) => {
       this.data[ key ] = obj[key];      
     } );
     this.store();
  }
  store(){
    localStorage.setItem(this.storageName,JSON.stringify(this.data));
  }

  get(key=''){
    if(key!=''){
      return this.data[key];
    }else{
      return this.data;
    }
  }
  delete(key){
    delete this.data[ key ];
    this.store();
  }
  deleteAll(){
    this.data = {};
    this.store();
  }

}
