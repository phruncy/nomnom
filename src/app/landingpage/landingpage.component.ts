import { Component } from '@angular/core';
import { RecipeWidgetDisplayComponent } from "../recipe-widget-display/recipe-widget-display.component";

@Component({
  selector: 'app-landingpage',
  imports: [ RecipeWidgetDisplayComponent],
  template: `
    <header>
      <h1>CHOMP CHOMP CHOMP</h1>
    </header>
    <main>
      <app-recipe-widget-display></app-recipe-widget-display>
    </main>
    <footer></footer>
  `,
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

}
