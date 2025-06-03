import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRecipe } from './IRecipe';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  getRecipes(): Observable<IRecipe[]> {
    return this.http.get<any>('/dummyData.json').pipe(map((data) => data.recipes as IRecipe[]));
  }


}
