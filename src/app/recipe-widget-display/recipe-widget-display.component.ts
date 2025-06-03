import { RecipeService } from './../recipe.service';
import { Component, inject } from '@angular/core';
import { RecipeWidgetComponent } from '../recipe-widget/recipe-widget.component';
import { Observable } from 'rxjs';
import { IRecipe } from '../IRecipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-widget-display',
  providers: [RecipeService],
  imports: [RecipeWidgetComponent, AsyncPipe],
  template: `
    <div class="recipe-widget-display">
      @for (recipe of (recipes$ | async)?.slice(0, maxDisplayed); track recipe.id) {
        @if($index < maxDisplayed) {

          <app-recipe-widget [recipe]="recipe"></app-recipe-widget>
        }
      }
    </div>
  `,
  styleUrl: './recipe-widget-display.component.scss'
})
export class RecipeWidgetDisplayComponent {
  private recipeService = inject(RecipeService);
  public recipes$: Observable<IRecipe[]>;
  constructor() {
    this.recipes$ = this.recipeService.getRecipes();
  }

  get maxDisplayed(): number {
    return 3;
  }
}
