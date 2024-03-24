import { TicketEntity } from '@app/ticket/entities/ticket.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<TicketEntity> {
    const ticket = new TicketEntity();
    Object.assign(ticket, createTicketDto);

    return await this.ticketRepository.save(ticket);
  }

  async findAll(): Promise<TicketEntity[]> {
    return await this.ticketRepository.find();
  }

  async findOne(id: number): Promise<TicketEntity> {
    return await this.ticketRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateTicketDto: UpdateTicketDto,
  ): Promise<TicketEntity> {
    const ticket = await this.findOne(id);
    Object.assign(ticket, updateTicketDto);
    await this.ticketRepository.save(ticket);
    return ticket;
  }

  async remove(id: number): Promise<TicketEntity> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.delete({ id });
    return ticket;
  }
}
