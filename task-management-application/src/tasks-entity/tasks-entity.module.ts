import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntityService } from './tasks-entity.service';
import { TasksEntityController } from './tasks-entity.controller';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksEntityController],
  providers: [TasksEntityService, TasksRepository],
  exports: [TasksRepository],
})
export class TasksEntityModule {}
