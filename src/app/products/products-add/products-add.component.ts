import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../shared/models/product';
import { ProductService } from '../shared/services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'ed-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {
  id:string;
  buttonMsm:string;
  form:FormGroup;
  product:Product;

  constructor(private http:ProductService,private router:Router,private routerLink:ActivatedRoute,private fb:FormBuilder,private snack:MatSnackBar) { 
    this.id = this.routerLink.snapshot.paramMap.get('id');
    this.buttonMsm = "Add";
    console.log(this.id);
    this.createForm();
    this.getOne();
  }

  getOne() {
    if (this.id !== '0') {
      this.http.getOne(this.id).subscribe((data)=>{
        console.log(data);
        this.buttonMsm = "Edit"
        this.form.setValue({
          title:data.title,
          brand:data.brand,
          price:data.price,
          salePrice:data.salePrice,
          thumbImage:data.thumbImage
        })
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      title:['',[Validators.required]],
      brand:['',[Validators.required]],
      price:['',[Validators.required]],
      salePrice:['',[Validators.required]],
      thumbImage:['']
    });
  }

  ngOnInit(): void {
  }

  submit(){
    if (this.form.valid) {
      console.log(this.form.value);
      
      this.product = this.form.value;

      if (this.product.thumbImage === '') {
        this.product.thumbImage = './assets/img/no-image.jpg';
      }

      if (this.id === '0') {
        this.http.addProduct(this.product).subscribe((data)=>{
          console.log(data);
          this.snack.open(`${data.title} has been added`,'Ok',{
            duration:3000,
          });
          this.reset();
        });
      }else{
        this.product.id = this.id,
        this.http.editProduct(this.product).subscribe((data)=>{
          this.snack.open(`${data.title} has been editted`,'Ok',{
            duration:3000,
          });
          this.router.navigate(['/products/list'])
        });
      }
    }else{
      this.snack.open('Please insert data of the product','Ok',{
        duration:3000,
      });
    }
  }

  cancel(){
    this.router.navigate(['products/list']);
  }
  reset(){
    this.form.reset();
  }

  
  public get thumbImage() : string {
    return !this.form.get('thumbImage').value ? './assets/img/no-image.jpg' : this.form.get('thumbImage').value;
  }
  

}
