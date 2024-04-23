// We reuse this import in order to have access to the `body` property in requests
import { json, urlencoded } from 'express';

// Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
import logger from 'morgan';

// Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser
import cookieParser from 'cookie-parser';

// Needed to accept requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request is made from the same domain, by default express wont accept POST requests
import cors from 'cors';

const FRONTEND_URL = process.env.ORIGIN || 'http://localhost:3000';

// Middleware configuration
export const middlewareConfig = (app) => {
  // Because this will be hosted on a server that will accept requests from outside and it will be
  // hosted on a server with a `proxy`, express needs to know that it should trust that setting.
  // Services like Fly use something called a proxy and you need to add this to your server
  app.set('trust proxy', 1);

  // controls a very specific header to pass headers from the frontend
  app.use(
    cors({
      credentials: true,
      origin: [FRONTEND_URL, 'http://localhost:3000'],
    })
  );

  // In development environment the app logs
  app.use(logger('dev'));

  // To have access to `body` property in the request
  // The limit option sets the maximum size of the request body that can be parsed by the body-parser middleware
  // So, if a request's body size exceeds 10 mb, the body-parser middleware will reject the request with a 413 "Payload Too Large"
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());
};
