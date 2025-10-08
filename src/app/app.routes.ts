import { Routes } from '@angular/router';
import { Discover } from './pages/discover/discover';
import { Profile } from './pages/profile/profile';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'discover', pathMatch: 'full' },
      { path: 'discover', component: Discover },
      { path: 'profile', component: Profile },
    ],
  },
];
