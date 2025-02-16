import { HttpException, HttpStatus } from '@nestjs/common';
import ErrorMessages from './messages'; // Adjust the import path

export class CustomErrorException extends HttpException {
  constructor(
    errorCode: keyof typeof ErrorMessages,
    statusCode: HttpStatus = HttpStatus.NOT_FOUND,
    lang: string = 'en',
    info?: Record<string, any>, // Additional info can be passed here
  ) {
    const message = ErrorMessages[errorCode]?.[lang] || 'Unknown error';
    const response = {
      message,
      statusCode,
      ...(info && { info }),
    };
    super(response, statusCode);
  }
}
