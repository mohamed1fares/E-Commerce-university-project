import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Projects } from './projects/projects';
import { About } from './about/about';

export const routes: Routes = [
    {path: '',component:Home},
    {path: 'products',component:Projects},
    {path: 'about',component:About}
];
