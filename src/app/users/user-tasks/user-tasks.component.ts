import { Component, OnInit, inject, input } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

import { UsersService } from '../users.service';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ButtonComponent],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userName = input.required<string>();
  message = input.required<string>();
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot, // Contém informações sobre a rota ativa
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService); // Injeta o serviço de usuários
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId') // Busca o usuário pelo ID na rota
    )?.name || ''; // Retorna o nome do usuário ou uma string vazia se não encontrado
  return userName; // Retorna o nome do usuário
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute, // Contém informações sobre a rota ativa
  routerState
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks"; // Concatena o nome do usuário com "'s Tasks"
};
