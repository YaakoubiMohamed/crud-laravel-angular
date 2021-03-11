import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../classes/book';
import { BookService } from '../services/book.service';
import { Subject } from 'rxjs';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  dtElement: DataTableDirective;

  isDtInitialized:boolean = false;

  books:Book[];
  book:Book; 
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  type: any;

  constructor(private bookService:BookService,
    private router:Router,) { 
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    //setInterval( ()=>{
      this.getBooks();
    //},3000);
  } 
  
  getBooks(): void {
    this.bookService.getbooks()
        .subscribe(book =>{ this.books = book['books'];
          console.log(this.books);
          if (this.isDtInitialized) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          } else {
            this.isDtInitialized = true
            this.dtTrigger.next();
          }
    });
  }

  deleteBook(book){
    this.bookService.deleteBook(book).subscribe(
      data => {
        console.log(data);
        this.getBooks();
      },
      error => console.log(error)
    );
  }

  bookDetails(id: number){
    this.router.navigate(['show-book', id]);
  }

  EditBook(book){
    localStorage.setItem('book',JSON.stringify(book))
    this.router.navigate(['edit-book']);
  }
}
