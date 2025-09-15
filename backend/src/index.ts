import 'reflect-metadata';
import App from './app';
import { NoteRoute } from './routes/Note.route';

const port = 4000;

new App({
  port,
  middlewares: [],
  routes: [new NoteRoute()]
}).listen();
