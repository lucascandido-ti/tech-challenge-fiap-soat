import { CronExpression } from '@nestjs/schedule';
import { IsEnum, IsInstance, IsNotEmpty, ValidateNested } from 'class-validator';

export class PaymentWorkerConfig {
  @IsEnum(CronExpression)
  @IsNotEmpty()
  cronTime: CronExpression;
}

export class WorkerConfig {
  @IsInstance(PaymentWorkerConfig)
  @ValidateNested()
  payment: PaymentWorkerConfig;
}
