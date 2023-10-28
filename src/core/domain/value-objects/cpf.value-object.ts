import { DomainPrimitive, ValueObject } from '@/core/domain/base';
import { Guard } from '../utils';

export class CPF extends ValueObject<number | string> {
  get value(): number | string {
    return this.props.value;
  }

  protected validate(props: DomainPrimitive<number>): void {
    if (!Guard.lengthIsBetween(props.value, 11, 11)) {
      throw new Error('Invalid CPF');
    }
  }

  toNumber(): number {
    return parseInt(this.props.value.toString().replace(/\.|-/g, ''), 10);
  }
}
