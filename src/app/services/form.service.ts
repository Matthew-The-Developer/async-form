import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AnimalOption } from '../models/animal.model';
import { FavoriteFoodOption } from '../models/favorite-food.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getFavoriteFoodOptions(): Observable<FavoriteFoodOption[]> {
    return of([
      { value: 'pizza', label: 'Pizza' },
      { value: 'taco', label: 'Tacos' },
      { value: 'seafood', label: 'Seafood' },
      { value: 'sandwich', label: 'Sandwiches' },
      { value: 'pasta', label: 'Pasta' },
    ]);
  }

  getAnimalOptions(): Observable<AnimalOption[]> {
    return this.http.get<AnimalOption[]>('http://zoo-animal-api.herokuapp.com/animals/rand/10').pipe(
      catchError(error => {
        console.log(error);
        return throwError(() => new Error(error));
      })
    );
  }
}
