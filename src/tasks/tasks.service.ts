import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private _tasks: Task[] = [

    ]

    public getTasks(): Task[] {
        return this._tasks;
    }

    public getTasksWithFilters(filterQuery: GetTasksFilterDTO): Task[] {
        const { status, search } = filterQuery;
        let tasks = this.getTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }
        if (search) {
            tasks = tasks.filter(task => {
                return (task.title.includes(search) ||
                    task.description.includes(search))
            })
        }
        return tasks;
    }

    public getTaskById(id: string): Task {
        const found = this._tasks.find(item => item.id === id);
        if (!found) {
            throw new NotFoundException()
        } else {
            return found
        }
    }

    private getIndexOfTaskById(id: string): number {
        const indexOfUpdateItem = this._tasks.findIndex(item => item.id === id);
        if (indexOfUpdateItem === -1) {
            throw new NotFoundException()
        }
        return indexOfUpdateItem
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

    public updateTask(id: string, updateTaskDto: UpdateTaskDTO): Task {
        const { title, description, status } = updateTaskDto;
        const indexOfUpdateItem = this.getIndexOfTaskById(id);
        this._tasks[indexOfUpdateItem] = {
            title: title ?? this._tasks[indexOfUpdateItem].title,
            description: description ?? this._tasks[indexOfUpdateItem].description,
            status: status ?? this._tasks[indexOfUpdateItem].status,
            id
        }
        return this._tasks[indexOfUpdateItem]
    }

    public updateStatus(id: string, status: TaskStatus): Task {
        const indexOfUpdateItem = this.getIndexOfTaskById(id);
        this._tasks[indexOfUpdateItem].status = status;
        return this._tasks[indexOfUpdateItem]
    }

    public deleteTask(id: string): Task {
        const itemToDelete: Task = this.getTaskById(id);
        this._tasks = this._tasks.filter(item => item.id !== id);
        return itemToDelete
    }
}
