import { useLocation } from 'react-router-dom';
import qs from 'query-string';

export const useQueryString = () => {
  const location = useLocation();
  const ret = qs.parse(location.search, { parseNumbers: true });
  return ret;
};
