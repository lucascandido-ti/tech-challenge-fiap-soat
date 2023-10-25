export abstract class ValueObject {
  protected abstract equalityComponents(): string[];

  public compare(valueObject: ValueObject): number {
    if (this === valueObject) return 0;

    for (const k of this.equalityComponents()) {
      const a = (this as unknown as Record<string, never>)[k];
      const b = (valueObject as unknown as Record<string, never>)[k];

      if (a === b) continue;

      return a > b ? 1 : -1;
    }

    return 0;
  }

  public equals(valueObject?: unknown): boolean {
    if (!valueObject || typeof valueObject !== 'object' || !(valueObject instanceof ValueObject))
      return false;

    return this.compare(valueObject) === 0;
  }

  public static compareFn(a: ValueObject, b: ValueObject): number {
    return a.compare(b);
  }

  static isValueObject(obj: unknown): obj is ValueObject {
    return obj instanceof ValueObject;
  }
}
