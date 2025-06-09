import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-create-recipe-form',
    imports: [FormsModule, MatFormFieldModule, MatInputModule],
    styleUrl: './create-recipe-form.component.scss',
    template: `
        <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput placeholder="Kuhhintern" />
        </mat-form-field>
        <mat-form-field>
            <mat-label>Beschreibung</mat-label>
            <textarea matInput placeholder="chomp chomp chomp"></textarea>
        </mat-form-field>
    `,
})
export class CreateRecipeFormComponent {}
