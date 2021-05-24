import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id == id);

    if (!task) {
      throw new NotFoundException(`Task With ID '${id}' not found.`);
    }

    return task;
  }

  getFilteredTasks(getTasksFilterDto: GetTasksFilterDto) {
    const { status, filter } = getTasksFilterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status == status);
    }

    if (filter) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(filter) || task.description.includes(filter),
      );
    }
    return tasks;
  }
  deleteTaskById(id: string) {
    const removedTask = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id != id);
    return removedTask;
  }
  updateStatus(id: string, newStatus: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = newStatus;
    return task;
  }
  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
