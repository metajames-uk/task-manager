import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';

@Injectable()
export class TasksService {
    private _tasks: Task[] = [

    ]

    public getAllTasks(): Task[] {
        return this._tasks;
    }

    public getTaskById(id: string): Task | string {
        return this._tasks.find(item => item.id === id) ?? 'not found';
    }

    public createTask(createTaskDto: CreateTaskDTO): Task {
        const { title, description } = createTaskDto;
        const newTask: Task = {
            title,
            description,
            status: TaskStatus.Open,
            id: uuidv4()
        }
        this._tasks.push(newTask);
        return newTask;
    }

    public updateTask(id: string, updateTaskDto: UpdateTaskDTO): Task | string {
        const { title, description, status } = updateTaskDto;
        const indexOfUpdateItem = this._tasks.findIndex(item => item.id === id);
        if (indexOfUpdateItem === -1) {
            return 'not found'
        }
        this._tasks[indexOfUpdateItem] = {
            title: title ?? this._tasks[indexOfUpdateItem].title,
            description: description ?? this._tasks[indexOfUpdateItem].description,
            status: status ?? this._tasks[indexOfUpdateItem].status,
            id
        }
        return this._tasks[indexOfUpdateItem]
    }

    public updateTaskStatus(id: string, status: TaskStatus): Task | string {
        const indexOfUpdateItem = this._tasks.findIndex(item => item.id === id);
        if (indexOfUpdateItem === -1) {
            return 'not found'
        }
        this._tasks[indexOfUpdateItem].status = status;
        return this._tasks[indexOfUpdateItem]
    }

    public deleteTask(id: string): Task | string {
        const itemToDelete: Task = this._tasks.find(item => item.id === id);
        if (itemToDelete) {
            this._tasks = this._tasks.filter(item => item.id !== id);
        } else {
            return 'not found'
        }
        return itemToDelete
    }
}
