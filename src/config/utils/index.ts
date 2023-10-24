import { ConfigModuleOptions } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DataSourceOptions } from 'typeorm';
import { validateSync } from 'class-validator';
import { ClassConstructor, plainToClass } from 'class-transformer';

type MakeTypeOrmModuleOptionsProps = {
  dataSourceName?: string;
  configPropertyPath: string;
  entities: DataSourceOptions['entities'];
  migrations?: string[];
  migrationsRun?: boolean;
  cli?: {
    migrationsDir: string;
  };
};

export const POSTGRES_DATA_SOURCE = 'postgres';
export const postgresTypeOrmModuleOptions = makeTypeOrmModuleOptions({
  dataSourceName: POSTGRES_DATA_SOURCE,
  configPropertyPath: 'db.postgres',
  entities: [],
});

function loadJsonFactory<T>(
  constructor: ClassConstructor<T>,
  config: Record<string, unknown>,
): () => T {
  function loadJson() {
    const validatedConfig = plainToClass(constructor, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig as Record<string, unknown>, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) throw new Error(errors.toString());

    return validatedConfig;
  }

  return loadJson;
}

export function getConfigModuleOptions<T>(
  configClass: ClassConstructor<T>,
  configJson: Record<string, unknown>,
): ConfigModuleOptions {
  return {
    isGlobal: true,
    ignoreEnvVars: true,
    load: [loadJsonFactory(configClass, configJson)],
  };
}

function makeTypeOrmModuleOptions({
  dataSourceName,
  configPropertyPath,
  entities,
  migrations,
  migrationsRun,
  cli,
}: MakeTypeOrmModuleOptionsProps): TypeOrmModuleAsyncOptions {
  const logging = process.env['NODE_ENV'] !== 'production';

  return {
    name: dataSourceName,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const typeormConfig = configService.get(configPropertyPath)!;

      return {
        ...typeormConfig,
        entities,
        logging,
        migrations,
        migrationsRun,
        cli,
      };
    },
  };
}
