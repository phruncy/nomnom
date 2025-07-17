import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRecipe } from '../IRecipe';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  private _allRecipes$: Observable<IRecipe[]>;

  constructor() {
    this._allRecipes$= this.getRecipes();
  }

  addRecipe(recipe: IRecipe): void {
    console.debug(recipe);
  }

  getRandomSubset(size: number): Observable<IRecipe[]>{
    return this._allRecipes$
      .pipe(map(data => {
        let set = new Set<IRecipe>();
        while (set.size < size) {
          const random = Math.floor(Math.random() * data.length);
          set.add(data[random]);
        }
        return Array.from(set);
      }));
  }

  private getRecipes(): Observable<IRecipe[]> {
    return this.http.get<any>('/dummyData.json').pipe(map((data) => data.recipes as IRecipe[]), shareReplay(1));
  }
}
