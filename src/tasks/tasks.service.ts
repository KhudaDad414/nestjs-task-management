import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id == id);
  }
  deleteTaskById(id: string) {
    const removedTask = this.tasks.find((task) => task.id == id);
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
