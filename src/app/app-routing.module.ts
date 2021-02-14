import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent,
  },
  {
    path:"",
    redirectTo:"login",
    pathMatch:"full"
  },
  {
    path:"products",
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
