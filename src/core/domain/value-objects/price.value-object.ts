import { ValueObject } from '@/core/domain/base';

export class Price extends ValueObject {
  constructor(public readonly price: number) {
    super();
  }

  protected equalityComponents(): (keyof Price)[] {
    return ['price'];
  }
}
