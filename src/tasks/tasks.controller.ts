import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return await this.tasksService.getAllTasks()
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<Task | string> {
        return await this.tasksService.getTaskById(id);
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
        return await this.tasksService.createTask(createTaskDto);
    }

    @Patch(':id')
    async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDTO): Promise<Task | string> {
        return await this.tasksService.updateTask(id, updateTaskDto);
    }

    @Patch(':id/status')
    async updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Promise<Task | string> {
        return await this.tasksService.updateTaskStatus(id, status);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string): Promise<Task | string> {
        return await this.tasksService.deleteTask(id);
    }
}
