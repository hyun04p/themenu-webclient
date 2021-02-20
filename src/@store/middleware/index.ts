import appMiddleware from './app';
import commonMiddleware from './common';

const middleware = [...commonMiddleware, ...appMiddleware];

export default middleware;
