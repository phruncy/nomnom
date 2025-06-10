import { Routes } from '@angular/router';
import { LandingpageComponent } from './layout/landingpage/landingpage.component';
import { CreateRecipeComponent } from './layout/create-recipe/create-recipe.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingpageComponent,
    },
    {
        path: 'create',
        component: CreateRecipeComponent,
    },
];
