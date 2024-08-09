import { IsEnum } from 'class-validator';
import { TaskStatus } from '../../models/task.model';

export class updateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
