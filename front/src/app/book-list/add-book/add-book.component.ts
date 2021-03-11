import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/classes/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  
  book: Book;
  submitted = false;
  public equipForm: FormGroup;

  constructor(private bookService: BookService,
    private router: Router,
    public fb: FormBuilder,) { }

    ngOnInit() {
      this.addForm();
    }
    addForm() {
      this.equipForm = this.fb.group({
        name: ['', [Validators.required]],
        author: ['', [Validators.required]],
        price: ['', [Validators.required]],
        about: [''],
      });
    }

  newBook(): void {
    this.submitted = false;
  }
  
  get f() { return this.equipForm.controls; }

  save() {
    this.bookService.createBook(this.equipForm.value)
      .subscribe(data => console.log(data), error => console.log(error));
    console.log('book',this.equipForm.value);
    //this.book = new Book();
    this.gotoList();    
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/']);
  }



}
