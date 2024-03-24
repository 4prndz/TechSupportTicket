import {
  Priority,
  Status,
  TicketEntity,
} from '@app/ticket/entities/ticket.entity';
import { TicketsResponse } from '@app/ticket/types/ticketResponse.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<TicketEntity> {
    const ticket = new TicketEntity();
    Object.assign(ticket, createTicketDto);

    if (!Object.values(Priority).includes(createTicketDto.priority)) {
      throw new HttpException(
        'The provided priority value is invalid!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!Object.values(Status).includes(createTicketDto.status)) {
      throw new HttpException(
        'The provided status value is invalid!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.ticketRepository.save(ticket);
  }

  async findAll(query: any): Promise<TicketsResponse> {
    const queryBuilder = this.dataSource
      .getRepository(TicketEntity)
      .createQueryBuilder('tickets');

    if (query.priority) {
      if (Object.values(Priority).includes(query.priority)) {
        queryBuilder.andWhere('tickets.priority = :priority', {
          priority: `${query.priority}`,
        });
      } else {
        throw new HttpException(
          'The provided priority value is invalid!',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (query.status) {
      if (Object.values(Status).includes(query.status)) {
        queryBuilder.andWhere('tickets.status = :status', {
          status: `${query.status}`,
        });
      } else {
        throw new HttpException(
          'The provided status value is invalid!',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    queryBuilder.orderBy('tickets.createdAt', 'ASC');

    const ticketCount = await queryBuilder.getCount();

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const tickets = await queryBuilder.getMany();

    return { tickets: tickets, ticketCount };
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
