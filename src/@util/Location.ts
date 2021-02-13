import { useLocation } from 'react-router-dom';
import qs from 'query-string';

export const useQueryString = () => {
  const location = useLocation();
  const ret = qs.parse(location.search);
  console.log(ret);
  return ret;
};
