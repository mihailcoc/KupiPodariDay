import Request from 'express';
import * as cookieParser from 'cookie-parser';

export interface Request {
  user: {
    id: number;
    username?: string;
    about?: string;
    avatar?: string;
    email?: string;
    cookies?: cookieParser;
  };
}
