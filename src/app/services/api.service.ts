import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  // Phần api sản phẩm
  postProduct(data: any){
    return this.http.post<any>("http://localhost:3000/producList/",data);
  }
  getProduct() {
    return this.http.get<any>("http://localhost:3000/producList/");
  }
  putProduct(data: any, id : number) {
    return this.http.put<any>("http://localhost:3000/producList/"+id, data);
  }
  deleteProduct(id : number) {
    return this.http.delete<any>("http://localhost:3000/producList/"+id)
  }
  getProductDetail() {
    return this.http.get<any>("http://localhost:3000/producList/")
      .pipe(map((res:any)=>{
        return res;
        }
      ))
  }


  // phần Api người dùng
  getUser() {
    return this.http.get<any>("http://localhost:3000/signupUsers/");
  }
  postUser(data: any){
    return this.http.post<any>("http://localhost:3000/signupUsers/",data);
  }
  putUer(data: any, id : number) {
    return this.http.put<any>("http://localhost:3000/signupUsers/"+id, data);
  }
  deleteUer(id : number) {
    return this.http.delete<any>("http://localhost:3000/signupUsers/"+id)
  }

}
