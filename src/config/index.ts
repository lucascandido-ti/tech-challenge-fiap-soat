import { IsInstance, ValidateNested } from 'class-validator';

import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';

import { DbConfig } from './db.config';
import { ApiConfig } from './api.config';
import { getConfigModuleOptions } from './utils';

import defaultSettingsJson from './settings.json';

export class Config {
  @IsInstance(ApiConfig)
  @ValidateNested()
  api: ApiConfig;

  @IsInstance(DbConfig)
  @ValidateNested()
  db: DbConfig;
}

function getConfigJson(): Record<string, unknown> {
  try {
    const configJsonPath = path.join(process.cwd(), '\\src\\config\\settings.json');
    const configJsonString = fs.readFileSync(configJsonPath, {
      encoding: 'utf-8',
    });

    const configJson = JSON.parse(configJsonString);

    return _.merge(defaultSettingsJson, configJson);
  } catch {
    return defaultSettingsJson;
  }
}

export const configModuleOptions = getConfigModuleOptions(Config, getConfigJson());
