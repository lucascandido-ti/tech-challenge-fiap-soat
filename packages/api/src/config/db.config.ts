import { IsInstance, IsNotEmpty, IsPort, IsString, ValidateNested } from 'class-validator';
import * as pg from 'pg';

export class PostgresTypeOrmConfig {
  readonly type: 'postgres' = 'postgres' as const;

  constructor() {
    // INT8 = BIGINT
    pg.types.setTypeParser(pg.types.builtins.INT8, parseInt);
  }

  @IsString()
  @IsNotEmpty()
  host: string;

  @IsPort()
  port: string;

  @IsString()
  @IsNotEmpty()
  database: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class DbConfig {
  @IsInstance(PostgresTypeOrmConfig)
  @ValidateNested()
  postgres: PostgresTypeOrmConfig;
}
