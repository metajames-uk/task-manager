import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';
export class GetTasksFilterDTO {
    @IsOptional()
    @IsIn([TaskStatus.Open, TaskStatus.InProgress, TaskStatus.Done])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}