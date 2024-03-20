import { HttpCode, HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';

export function ApiOperationWithParams(operationOptions: {
  summary: string;
  responseDescription: string;
  queryParameters?: { name: string; description: string }[];
}) {
  const { summary, responseDescription, queryParameters } = operationOptions;

  const decoratorsArray = [
    ApiOperation({ summary }),
    ApiResponse({
      description: responseDescription,
      status: HttpStatus.OK,
    }),
  ];

  if (queryParameters) {
    queryParameters.forEach(param => {
      decoratorsArray.push(
        ApiQuery({
          name: param.name,
          required: false,
          description: param.description,
        }),
      );
    });
  }

  decoratorsArray.push(HttpCode(HttpStatus.OK));

  return applyDecorators(...decoratorsArray);
}

export function ApiOperationWithBody(operationOptions: {
  summary: string;
  responseDescription: string;
  requestBodyType: any; // Tipo do corpo da requisição
  examples?: any; // Exemplo do corpo da requisição
}) {
  const { summary, responseDescription, requestBodyType, examples } = operationOptions;

  const decoratorsArray = [
    ApiOperation({ summary }),
    ApiResponse({
      description: responseDescription,
      status: HttpStatus.OK,
    }),
    ApiBody({ type: requestBodyType, description: 'Request body', examples }), // Inclua o exemplo do corpo da requisição
  ];

  decoratorsArray.push(HttpCode(HttpStatus.OK));

  return applyDecorators(...decoratorsArray);
}
