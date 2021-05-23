import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
  @Post()
  creteTask(
    @Body('title') title: string,
    @Body('descriptions') description: string,
  ) {
    return this.tasksService.createTask(title, description);
  }
}
