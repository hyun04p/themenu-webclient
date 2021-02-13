import { useLocation } from 'react-router-dom';
import qs from 'query-string';

export const useQueryString = () => {
  const location = useLocation();

  return qs.parse(location.search);
};
