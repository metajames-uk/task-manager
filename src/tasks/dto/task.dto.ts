import { IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';
export class CreateTaskDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;
}

export class UpdateTaskDTO {
    readonly title?: string;
    readonly description?: string;
    readonly status?: TaskStatus;
}