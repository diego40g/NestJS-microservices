import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksEntityService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
    /* Is more remcommend to use the repository to create the task 
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;*/
  }

  async deleteTask(id: string): Promise<void> {
    const result = this.tasksRepository.deleteTask(id);
    if ((await result).affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
