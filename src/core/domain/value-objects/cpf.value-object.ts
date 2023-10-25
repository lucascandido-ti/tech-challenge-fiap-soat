import { ValueObject } from '@/core/domain/base';

export class CPF extends ValueObject {
  constructor(public readonly cpf: string) {
    super();
  }

  protected equalityComponents(): (keyof CPF)[] {
    return ['cpf'];
  }
}
