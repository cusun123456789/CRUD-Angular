import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SingupComponent } from './components/singup/singup.component';
import {DetailPageProductComponent} from "./components/detail-page-product/detail-page-product.component";

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'body', component: BodyComponent },
  { path: 'dialog', component: DialogComponent },
  { path: 'user', component: NavBarComponent},
  { path: 'details', component: DetailPageProductComponent},
  // { path: 'main', loadChildren: () => import},


  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
