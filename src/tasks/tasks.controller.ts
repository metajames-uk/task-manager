import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    async getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDTO): Promise<Task[]> {
        if (Object.keys(filterDto).length) {
            return await this.tasksService.getTasksWithFilters(filterDto);
        }
        return await this.tasksService.getTasks()
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return await this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
        return await this.tasksService.createTask(createTaskDto);
    }

    @Patch(':id')
    async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDTO): Promise<Task> {
        return await this.tasksService.updateTask(id, updateTaskDto);
    }

    @Patch(':id/status')
    async updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return await this.tasksService.updateStatus(id, status);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string): Promise<Task> {
        return await this.tasksService.deleteTask(id);
    }
}
