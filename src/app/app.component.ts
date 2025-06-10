import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/global/footer/footer.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent],
    styleUrl: './app.component.scss',
    template: `
        <router-outlet></router-outlet>
        <app-footer></app-footer>
    `,
})
export class AppComponent {
    title = 'nom';
}
