import { Component, inject, input } from '@angular/core';
import { ResolveFn, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userTasks = input.required<Task[]>();
  userId = input.required<string>();
  order = input<'asc' | 'desc' | undefined>();
}

// Define uma função de resolução (resolver) para a rota que retorna uma lista de tarefas do usuário.
// O tipo `ResolveFn<Task[]>` indica que a função retorna um array de objetos do tipo `Task`.
export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot // Contém informações sobre a rota ativa, como parâmetros e query params.
) => {
  // Obtém o parâmetro de consulta (query param) 'order' da URL.
  const order = activatedRouteSnapshot.queryParams['order'];

  // Injeta o serviço `TasksService` para acessar as tarefas.
  const tasksService = inject(TasksService);

  // Obtém todas as tarefas e filtra apenas as que pertencem ao usuário especificado no parâmetro 'userId' da rota.
  const tasks = tasksService
    .allTasks() // Retorna todas as tarefas disponíveis.
    .filter(
      (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId') // Filtra tarefas pelo `userId` da rota.
    );

  // Verifica se o parâmetro 'order' foi fornecido e se é 'asc' (ordem crescente).
  if (order && order === 'asc') {
    // Ordena as tarefas em ordem crescente com base no `id`.
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    // Caso contrário, ordena as tarefas em ordem decrescente com base no `id`.
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  // Retorna as tarefas filtradas e ordenadas.
  // Se não houver tarefas, retorna um array vazio.
  return tasks.length ? tasks : [];
};
