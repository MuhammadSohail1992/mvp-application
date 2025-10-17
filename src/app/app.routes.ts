import { Routes } from '@angular/router';
import { Discover } from './pages/discover/discover';
import { Profile } from './pages/profile/profile';
import { MainLayout } from './layout/main-layout/main-layout';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'discover', pathMatch: 'full' },
      { path: 'discover', component: Discover },
      // { path: 'profile/me/', component: Profile },
      { path: 'profile/me/releases', component: Profile },
      { path: 'profile/me', component: Profile },
    ],
  },
];
