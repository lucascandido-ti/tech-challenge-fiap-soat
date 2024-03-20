import { ConfigModule, ConfigService } from '@nestjs/config';

import { IsNotEmpty, IsString } from 'class-validator';

import { KeycloakConnectConfig, KeycloakConnectModuleAsyncOptions } from 'nest-keycloak-connect';

export class KeycloakConfig implements KeycloakConnectConfig {
  static readonly options: KeycloakConnectModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      configService.get<KeycloakConfig>('auth.keycloak')!,
  };

  @IsNotEmpty()
  @IsString()
  realm = 'challenge';

  @IsNotEmpty()
  @IsString()
  clientId = 'challenge_client';

  @IsNotEmpty()
  @IsString()
  secret!: string;

  @IsNotEmpty()
  @IsString()
  authServerUrl = 'http://localhost:8080';

  @IsNotEmpty()
  @IsString()
  realmPublicKey!: string;
}
