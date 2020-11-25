import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return await this.tasksService.getAllTasks()
    }

    @Post()
    async createTask(@Body() request: CreateTaskDTO): Promise<Task> {
        return this.tasksService.createTask(request.title, request.description);
    }
}
