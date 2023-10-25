export interface RepositoryPort<Entity> {
  insert(entity: Entity | Entity[]): Promise<void>;
  findOneById(id: string): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  delete(entity: Entity): Promise<boolean>;
}
