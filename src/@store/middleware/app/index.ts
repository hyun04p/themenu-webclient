import routeMiddleware from './RouteMiddleware';
import authMiddleware from './AuthMiddleware';
import orderMiddleware from './OrderMiddleware';

const appMiddleware = [
  ...routeMiddleware,
  ...authMiddleware,
  ...orderMiddleware,
];

export default appMiddleware;
