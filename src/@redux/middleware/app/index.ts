import authMiddleware from './AuthMiddleware';

const appMiddleware = [...authMiddleware];

export default appMiddleware;
