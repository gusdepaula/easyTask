import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  UserTasksComponent,
  resolveTitle,
  resolveUserName,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
    title: 'No task selected',
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    loadChildren: () =>
      import('./users/users.routes').then((module) => module.routes),
    data: {
      message: 'Hello!',
    },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
