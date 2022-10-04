import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { AnimalOption } from '../models/animal.model';
import { FavoriteFoodOption } from '../models/favorite-food.model';
import { SpacecraftOption } from '../models/spacecraft.model';

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

  getAnimalOptions(url: string): Observable<AnimalOption[]> {
    return this.http.get<AnimalOption[]>(url).pipe(
      delay(3000),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error(error));
      })
    );
  }

  getSpacecraftOptions(url: string): Observable<SpacecraftOption[]> {
    return this.http.get<SpacecraftOption[]>(url).pipe(
      delay(5000),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error(error))
      }),
      map((result: any) => result.spacecrafts)
    );
  }
}
