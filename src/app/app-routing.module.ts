import { ColaboradorDeleteComponent } from './components/colaborador/colaborador-delete/colaborador-delete.component';
import { ColaboradorUpdateComponent } from './components/colaborador/colaborador-update/colaborador-update.component';
import { ColaboradorCrudComponent } from './views/colaborador-crud/colaborador-crud.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './views/home/home.component'
import { ProductCrudComponent } from './views/product-crud/product-crud.component'
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ColaboradorCreateComponent } from './components/colaborador/colaborador-create/colaborador-create.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductCrudComponent
  },
  {
    path: "products/create",
    component: ProductCreateComponent
  },
  {
    path: "products/update/:id",
    component: ProductUpdateComponent
  },
  {
    path: "products/delete/:id",
    component: ProductDeleteComponent
  },
  {
    path: "colaboradores",
    component: ColaboradorCrudComponent
  },
  {
    path: "colaboradores/create",
    component: ColaboradorCreateComponent
  },
  {
    path: "colaboradores/update/:id",
    component: ColaboradorUpdateComponent
  },
  {
    path: "colaboradores/delete/:id",
    component: ColaboradorDeleteComponent
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
