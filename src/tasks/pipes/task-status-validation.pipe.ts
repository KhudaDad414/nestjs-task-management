import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: string) {
    value = value.toUpperCase();
    if (value in TaskStatus) {
      return value;
    }
    throw new BadRequestException(`'${value}' is not a valid status`);
  }
}
