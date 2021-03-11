import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { AddBookComponent } from './book-list/add-book/add-book.component';
import { EditBookComponent } from './book-list/edit-book/edit-book.component';

const routes: Routes = [
  {path:'', component: BookListComponent},
  {path:'add', component: AddBookComponent},
  {path:'edit-book', component: EditBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
