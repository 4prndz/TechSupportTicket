import { TicketEntity } from '@app/ticket/entities/ticket.entity';

export interface TicketsResponse {
  tickets: TicketEntity[];
  ticketCount: number;
}
