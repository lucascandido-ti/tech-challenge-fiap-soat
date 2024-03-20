import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value === 'number') {
            // Verificar se é um número de 11 dígitos
            const entradaStr = value.toString();
            return /^[0-9]{11}$/.test(entradaStr);
          } else if (typeof value === 'string') {
            // Verificar se é uma string no formato "xxx.xxx.xxx-xx"
            return /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/.test(value);
          }
          return false;
        },
      },
    });
  };
}
