import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Error } from './error/error';
import { ProjectsPage } from './projects-page/projects-page';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'projects-page',
        component: ProjectsPage
    },
    {
        path: 'error',
        component: Error
    },
    {
        path: '**',
        redirectTo: 'error'
    }
];
