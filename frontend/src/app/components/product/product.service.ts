import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  protocol = window.location.protocol;
  host = '192.168.0.5';
  port = '3001';

  baseUrl = `${this.protocol}//${this.host}:${this.port}/products`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    if(product.name == '' || product.price == null){
      const url = this.baseUrl + product.id;
      console.log("name: " + product.name
      + "\n price: " + product.price);
      this.showMessage('Dados invalidos! Produto não cadastrado...', true);
      return this.http.get<Product>(url);
    }else{
      return this.http.post<Product>(this.baseUrl, product).pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      );
    }
  }

  
  read(): Observable<Product[]> {
    // console.log("protocol: " + this.protocol);
    // console.log("host: " + this.host);
    // console.log("port: " + this.port);
    // console.log("baseUrl: " + this.baseUrl);
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
  readById(id: string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
  delete(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    this.showMessage(`Ocorreu um erro: ${e.message}!`, true);
    return EMPTY;
  }
}
