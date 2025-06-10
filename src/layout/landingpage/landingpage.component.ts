import { Component } from '@angular/core';
import { RecipeWidgetDisplayComponent } from '../../app/recipe-widget-display/recipe-widget-display.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-landingpage',
    imports: [RecipeWidgetDisplayComponent, RouterLink, MatButtonModule],
    template: `
        <header>
            <h1>CHOMP CHOMP CHOMP</h1>
        </header>
        <main>
            <app-recipe-widget-display></app-recipe-widget-display>
            <a matButton routerLink="create">New Recipe</a>
        </main>
        <footer></footer>
    `,
    styleUrl: './landingpage.component.scss',
})
export class LandingpageComponent {}
