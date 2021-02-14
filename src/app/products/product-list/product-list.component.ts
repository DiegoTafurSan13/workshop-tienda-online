import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../shared/models/product';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'ed-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[];

  constructor(private http:ProductService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.http.getAll().subscribe((data)=>{
      this.products = data;
    });
  }
  delete(id:string){
    console.log(id);
    this.http.deleteProduct(id).subscribe(data=>console.log(data));
    this.products.forEach((data,i) =>{
      if (data.id === id) {
        this.products.splice(i,1);
        this.snack.open(`${data.title} has been deleted`,'Ok',{
          duration:3000
        });
      }
    });
  }



}
