import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        username?:string;
        about?:string;
        avatar?:string;
        email?:string;
      }
    }
  }
}
