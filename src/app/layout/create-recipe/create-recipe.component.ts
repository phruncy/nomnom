import { Component } from '@angular/core';
import { CreateRecipeFormComponent } from '../../create-recipe-form/create-recipe-form.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-create-recipe',
    imports: [CreateRecipeFormComponent, MatCardModule],
    styleUrl: './create-recipe.component.scss',
    template: `
        <div class="container">
            <mat-card class="card">
                <mat-card-header>
                    <mat-card-title>Erstelle ein neues Rezept</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                    <app-create-recipe-form></app-create-recipe-form>
                </mat-card-content>
            </mat-card>
        </div>
    `,
})
export class CreateRecipeComponent {}
