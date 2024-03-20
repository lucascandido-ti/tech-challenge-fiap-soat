import { DomainPrimitive, ValueObject } from '@/core/domain/base';

export class Price extends ValueObject<number> {
  get value(): number {
    return this.props.value;
  }

  protected validate(_: DomainPrimitive<number>): void {
    //
  }
}
