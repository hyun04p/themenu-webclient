import routeMiddleware from './RouteMiddleware';
import authMiddleware from './AuthMiddleware';

const appMiddleware = [...routeMiddleware, ...authMiddleware];

export default appMiddleware;
