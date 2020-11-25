import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
    private _tasks: Task[] = [

    ]

    public getAllTasks(): Task[] {
        return this._tasks;
    }

    public createTask(title: string, description: string): Task {
        const newTask: Task = {
            title,
            description,
            status: TaskStatus.Open,
            id: uuidv4()
        }
        this._tasks.push(newTask);
        return newTask;
    }
}
