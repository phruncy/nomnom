import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { CreateRecipeFormComponent } from './create-recipe-form/create-recipe-form.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingpageComponent
  },
  {
    path:'create',
    component: CreateRecipeFormComponent
  }
];
