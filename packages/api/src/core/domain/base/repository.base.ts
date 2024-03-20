import { DeleteResult } from 'typeorm';

export interface RepositoryPort<Entity> {
  insert(entity: Entity): Promise<Entity>;
  findOneById(id: string | number): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  delete(entity: Entity): Promise<DeleteResult>;
}
