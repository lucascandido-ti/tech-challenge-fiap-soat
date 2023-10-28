import { ValueObject } from '@/core/domain/base';

export class Price extends ValueObject {
  constructor(public readonly price: number) {
    super();
  }

  protected equalityComponents(): (keyof Price)[] {
    return ['price'];
  }

  public add(otherPrice: Price): Price {
    const resultPrice = this.price + otherPrice.price;
    return new Price(resultPrice);
  }

  public toNumber(): number {
    return this.price;
  }
}
