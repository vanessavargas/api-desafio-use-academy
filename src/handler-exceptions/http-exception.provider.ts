import { HttpStatus } from '../utils/enums/http-status.enum';
import { ErrorHandler } from './error-handler';

export class HttpException extends ErrorHandler {
  constructor(response: string, status = HttpStatus.INTERNAL_SERVER_ERROR) {
    const error = new Error(response);
    error.name = 'HttpException';
    super(error, status);
  }
}
