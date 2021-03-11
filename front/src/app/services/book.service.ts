import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book } from '../classes/book';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for book consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public urls = 'http://127.0.0.1:8000/api/v1/books'; // url pour la récupération de la partie backend(laravel)

  constructor(private http: HttpClient) { }
  //* afficher tous les books*/
  getbooks (): Observable<Book[]> {
  return this.http.get<Book[]>(this.urls).pipe(
    tap(_ => console.log('fetched Books')),
    catchError(this.handleError<Book[]>('getBooks', []))
  );
}

 
  //* ajouter book*/
  createBook(book: Book): Observable<any> {
    return this.http.post<Book>(this.urls, book, httpOptions)
    .pipe(
      tap((newBook: Book) => console.log(`added hero w/ id=${newBook.id}`)),
      catchError(this.handleError<Book>('create'))
    );
  }
//* Afficher book*/
  getBook(id: number): Observable<any> {
    return this.http.get(`${this.urls}/${id}`);
  }
  //* modifier book*/
 updateBook(book: Book,id: number): Observable<any> {
  return this.http.put<Book>(`${this.urls}/${id}`, book, httpOptions).pipe(
    tap((newBook: Book) => console.log(`utilisateur modifier id=${newBook.id}`)),
    catchError(this.handleError('probleme modification', book))
  );
}

  //* supprimer book*/
    deleteBook(book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.urls}/${id}`;
    //console.log(id);

    return this.http.delete<Book>(url, httpOptions).pipe(
      tap(_ => console.log(` utilisateur supprimer  id=${id}`)),
      catchError(this.handleError<Book>('delete'))
    );
  } 
}
