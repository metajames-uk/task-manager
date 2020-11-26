import { TaskStatus } from '../task.model';
export class CreateTaskDTO {
    readonly title: string;
    readonly description: string;
}

export class UpdateTaskDTO {
    readonly title?: string;
    readonly description?: string;
    readonly status?: TaskStatus;
}