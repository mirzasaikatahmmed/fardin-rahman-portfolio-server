import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('educations')
export class Education extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  degree: string;

  @Column({ type: 'varchar', length: 255 })
  institution: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  field: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  certificateUrl: string;

  @Column({ type: 'int', default: 0 })
  order: number;
}
