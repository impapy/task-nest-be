import { Context } from './common/dto';

declare global {
  namespace Express {
    interface Request {
      context: Context; // Extend the Request interface to include context
    }
  }
}
