import Request from 'express';

export interface Request {
  user: {
    id: number;
    username?: string;
    about?: string;
    avatar?: string;
    email?: string;
    cookies?: string;
  };
}
