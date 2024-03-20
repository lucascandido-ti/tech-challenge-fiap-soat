import { IsInstance, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class KeycloakConfig {
  @IsString()
  @IsNotEmpty()
  realm: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  secret: string;

  @IsString()
  @IsNotEmpty()
  authServerUrl: string;
}

export class AuthConfig {
  @IsInstance(KeycloakConfig)
  @ValidateNested()
  keycloak: KeycloakConfig;
}
