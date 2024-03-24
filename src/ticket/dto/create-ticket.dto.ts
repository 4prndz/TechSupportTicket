import { Priority, Status } from '@app/ticket/entities/ticket.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  readonly status: Status;

  readonly priority: Priority;

  readonly deadLine: Date;
}
