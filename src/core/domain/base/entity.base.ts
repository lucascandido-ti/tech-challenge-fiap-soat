export abstract class Entity<TId> {
  constructor(
    public readonly id: TId,
    public readonly createdAt = new Date(),
    public updatedAt = new Date(),
  ) {}

  public equals(entity?: unknown): boolean {
    if (!entity || typeof entity !== 'object' || !(entity instanceof Entity)) return false;

    return this === entity || this.id === entity.id;
  }
}
