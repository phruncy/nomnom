import { Component, input } from '@angular/core';
import { IRecipe } from '../IRecipe';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-recipe-widget',
  imports: [MatCardModule, MatChipsModule, MatButtonModule],
  template: `
  <mat-card class="recipe-widget">
    <mat-card-header>
      <mat-card-title>{{ recipe().name }}</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <p>{{ recipe().description }}</p>
      <p>

        <a [href]="recipe().link" target="_blank">View Recipe</a>
      </p>
      <mat-chip-set>

        @for (tag of recipe().tags; track $index) {
          <mat-chip>{{tag}}</mat-chip>
        }
      </mat-chip-set>
    </mat-card-content>
      <mat-card-actions>
        <button mat-button>KOCHEN</button>
      </mat-card-actions>
  </mat-card>
  `,
  styleUrl: './recipe-widget.component.scss'
})
export class RecipeWidgetComponent {
  recipe = input.required<IRecipe>();
}
