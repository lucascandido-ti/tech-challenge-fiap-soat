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
          const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
          return cpfRegex.test(value);
        },
      },
    });
  };
}
