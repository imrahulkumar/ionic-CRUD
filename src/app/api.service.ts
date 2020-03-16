import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api/v1/products';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  store:any[]=[
    {
      prod_name: "product A",
      prod_desc: "description ",
      prod_price: "342",
      id: 213
    },
    {
      prod_name: "product B",
      prod_desc: "description ",
      prod_price: "392",
      id: 902
    },   
    {
      prod_name: "product C",
      prod_desc: "description ",
      prod_price: "942",
      id: 512
    }, 
  ];

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getProducts(): Observable<any> {
    const observable = new Observable(observer => {
      setTimeout(() => {
        if(this.store.length > 0)
          observer.next(this.store);
          else
          observer.next([]);
      }, 1000);
   });
     return observable;
  }

  getProduct(id: any): Observable<any> {
    const observable = new Observable(observer => {
      setTimeout(() => {
        let prod = this.store.filter(d => d.id == id);
        // console.log(prod)
         if(prod.length > 0)
          observer.next(prod[0]);
          else
          observer.error('No product found');
      }, 1000);
   });
     return observable;
  }

  addProduct(product:any): Observable<any> {
    this.store.push(product);
    const observable = new Observable(observer => {
      setTimeout(() => {
          observer.next({_id:product.id});
      }, 1000);
   });
     return observable;
  }

  updateProduct(id: any, product: any): Observable<any> {
    const observable = new Observable(observer => {
      setTimeout(() => {            
           this.store = this.store.map((d)=>{
                
            if(d.id == id){
                return {...product,id
                }                
            }
            else
            return d

           })
         observer.next({_id:id});  
         },1000);
    
      })
      return observable;
    // const url = `${apiUrl}/${id}`;
    // return this.http.put(url, product, httpOptions).pipe(
    //   tap(_ => console.log(`updated product id=${id}`)),
    //   catchError(this.handleError<any>('updateProduct'))
    // );
  }

  deleteProduct(id: any): Observable<any> {
    const observable = new Observable(observer => {
      setTimeout(() => {            
        debugger
        let ord:any[] = this.store.filter(d => d.id != id);
        if(ord.length > 0){
          this.store = []
          this.store = ord;       
         }
         observer.next('deleted successfully');  
         },1000);
    
      })

 return observable;
    // const url = `${apiUrl}/${id}`;
    // return this.http.delete<Product>(url, httpOptions).pipe(
    //   tap(_ => console.log(`deleted product id=${id}`)),
    //   catchError(this.handleError<Product>('deleteProduct'))
    // );
  }
}
