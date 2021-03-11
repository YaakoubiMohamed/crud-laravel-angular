import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/classes/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: Book ;
  submitted = false;
  id:number;
  prod:any;
  public prodForm: FormGroup;

  constructor(public fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router) { }

  ngOnInit() {
    this.prod = JSON.parse(localStorage.getItem('book'));
    console.log(this.id);
    this.prodForm = this.fb.group({
      name: [this.prod.name, [Validators.required]],
      author: [this.prod.author, [Validators.required]],
      price: [this.prod.price, [Validators.required]],
      about: [this.prod.about],
    });
  }

  newBook(): void {
    this.submitted = false;
  }

  edit() {
    this.bookService.updateBook(this.prodForm.value, this.prod.id)
      .subscribe(data => console.log(data), error => console.log(error));
    this.gotoList();
  }

  get f() { return this.prodForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.edit();    
  }
  gotoList() {
    this.router.navigate(['/']);
  }

}
