import { RecipeService } from '../core/services/recipe.service';
import { Component, inject } from '@angular/core';
import { RecipeWidgetComponent } from '../recipe-widget/recipe-widget.component';
import { Observable } from 'rxjs';
import { IRecipe } from '../core/IRecipe';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-widget-display',
  providers: [RecipeService],
  imports: [RecipeWidgetComponent, AsyncPipe, MatButtonModule, SlicePipe],
  template: `
    <div class="recipe-widget-display">
      @for (recipe of recipes$ | async | slice:0:maxDisplayed; track recipe.id) {
        @if($index < maxDisplayed) {
          <app-recipe-widget [recipe]="recipe"></app-recipe-widget>
        }
      }
    </div>
    <button mat-button (click)="updateSelection()">Ist mir egal :&#40;</button>
  `,
  styleUrl: './recipe-widget-display.component.scss'
})
export class RecipeWidgetDisplayComponent {
  private recipeService = inject(RecipeService);
  public recipes$: Observable<IRecipe[]>;
  constructor() {
    this.recipes$ = this.recipeService.getRandomSubset(this.maxDisplayed);
  }

  get maxDisplayed(): number {
    return 3;
  }

  updateSelection() {
    this.recipes$ = this.recipeService.getRandomSubset(this.maxDisplayed);
  }
}
