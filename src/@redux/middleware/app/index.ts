import AuthMiddleware from './AuthMiddleware';
import OrderMiddleware from './OrderMiddleware';

const AppMiddleware = [AuthMiddleware, OrderMiddleware];

export default AppMiddleware;
