import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { vacationEnum } from '../enums/vacation-type.enum';

@Entity()
export class EmployeeVacation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: vacationEnum,
  })
  vacationType: vacationEnum;

  @Column({ nullable: false, type: 'timestamp' })
  startDate: Date;

  @Column({ nullable: false, type: 'timestamp' })
  endDate: Date;
}
