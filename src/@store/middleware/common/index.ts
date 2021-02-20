import { throttle } from './throttle';
import { firebaseMiddleware } from './FirebaseMiddleware';

const commonMiddleware = [throttle, ...firebaseMiddleware];
export default commonMiddleware;
