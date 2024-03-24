import { TicketEntity } from '@app/ticket/entities/ticket.entity';
import { TicketsResponse } from '@app/ticket/types/ticketResponse.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTicketDto: CreateTicketDto): Promise<TicketEntity> {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  findAll(@Query() query: any): Promise<TicketsResponse> {
    return this.ticketService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TicketEntity> {
    return this.ticketService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<TicketEntity> {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TicketEntity> {
    return this.ticketService.remove(+id);
  }
}
