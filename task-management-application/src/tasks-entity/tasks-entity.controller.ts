import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { TasksEntityService } from './tasks-entity.service';

@Controller('tasks-entity')
export class TasksEntityController {
  constructor(private tasksService: TasksEntityService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
}
