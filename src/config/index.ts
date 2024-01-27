import { IsInstance, ValidateNested } from 'class-validator';

import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';

import { DbConfig } from './db.config';
import { ApiConfig } from './api.config';
import { getConfigModuleOptions } from './utils';

import defaultSettingsJson from './settings.json';

import { ConfigService } from '@nestjs/config';

export * from './utils';
export * from './db.config';
export * from './api.config';
export * from './worker.config';
export * from './datasourse.config';
export * from './dependecy-injection';

export class Config {
  @IsInstance(ApiConfig)
  @ValidateNested()
  api: ApiConfig;

  @IsInstance(DbConfig)
  @ValidateNested()
  db: DbConfig;
}

export function getConfigJsonConfigMap(configService: ConfigService): Record<string, unknown> {
  try {
    const configJsonString = configService.get<string>('MY_SETTINGS');
    const configJson = JSON.parse(configJsonString);
    return _.merge(defaultSettingsJson, configJson);
  } catch {
    return getConfigJsonLocal();
  }
}

export function getConfigJsonLocal(): Record<string, unknown> {
  try {
    const configJsonPath = path.join(process.cwd(), '/src/config/settings.json');
    const configJsonString = fs.readFileSync(configJsonPath, {
      encoding: 'utf-8',
    });

    const configJson = JSON.parse(configJsonString);

    return _.merge(defaultSettingsJson, configJson);
  } catch {
    return defaultSettingsJson;
  }
}

// Se for testar localmente, alterar a função de captura de configurações para getConfigJsonLocalHost

export const configModuleOptions = getConfigModuleOptions(Config, getConfigJsonLocal());
