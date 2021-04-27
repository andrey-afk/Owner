import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserInfoComponent} from "./components/user-info/user-info.component";


const routes: Routes = [
  {path: '', component: UserListComponent},
  {path: 'edit/:id', component: UserInfoComponent},
  {path: 'add', component: UserInfoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
