import { Column, PrimaryColumn, Entity as TypeOrmEntity } from 'typeorm';
import { Entity } from '@/libs/ddd';
import { CPF } from '@/core/domain/value-objects';

@TypeOrmEntity()
export class Customer extends Entity<number> {
  @PrimaryColumn()
  id: number;

  @Column('varchar', { nullable: true })
  name: string;

  @Column('varchar', { nullable: true })
  email: string;

  @Column('varchar', { nullable: true })
  cpf: CPF;
}
