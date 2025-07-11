import { Route } from '@angular/router';
import { ActivitiesComponent } from './pages/activities/activities.component';

export const routes: Route[] = [
  { path: '', redirectTo: 'activities', pathMatch: 'full' },
  { path: 'activities', loadComponent: () => import('./pages/activities/activities.component').then(m => m.ActivitiesComponent) },
  { path: '**', redirectTo: '' }
];
