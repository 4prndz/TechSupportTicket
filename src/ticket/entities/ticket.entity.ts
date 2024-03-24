import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum Status {
  CLOSE = 'CLOSE',
  OPEN = 'OPEN',
}

@Entity({ name: 'tickets' })
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: Status, default: Status.OPEN })
  status: Status;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.LOW,
  })
  priority: Priority;

  @Column({ default: null })
  deadLine: Date | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateAt = new Date();
  }

  // TODO - ManyToOne - Author - Who created the Ticket
  // TODO - OneToOne - assignedTo- Who will fix the Ticket
}
