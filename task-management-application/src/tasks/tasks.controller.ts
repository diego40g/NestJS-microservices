import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './models/task.model';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { GetTasksFilterDto } from './dto/request/get-tasks-filter.dto';
import { updateTaskStatusDto } from './dto/request/update-task.status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/id')
  getTaskById(@Body('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Get('/:id')
  getTaskParamById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Get('/filter')
  getTasksWithFilter(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilter(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }

  @Post('/dto')
  createTaskDto(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTaskDto(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') updateTaskStatusDto: updateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
}
