import { Open, Priority } from '@app/ticket/entities/ticket.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  readonly status: Open;

  readonly priority: Priority;

  readonly deadLine: Date;
}
