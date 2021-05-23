import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  status: TaskStatus;
  filter: string;
}
