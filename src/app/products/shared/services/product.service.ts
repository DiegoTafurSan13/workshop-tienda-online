import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URI_API = "http://localhost:3000/products";

  constructor(private http:HttpClient) { }

  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.URI_API}`);
  }
  getOne(id:string):Observable<Product>{
    return this.http.get<Product>(`${this.URI_API}/${id}`);
  }

  addProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.URI_API}`,product,{responseType:'json',reportProgress:true});
  }

  editProduct(product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.URI_API}/${product.id}`,product,{
      responseType:'json',
      reportProgress:true
    });
  }
  deleteProduct(id:string){
    return this.http.delete(`${this.URI_API}/${id}`,{ responseType:'json',
    reportProgress:true});
  }


}
