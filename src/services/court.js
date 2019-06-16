import request from '../utils/request';

const fetchCourtList = () => {
  return request('/api/court/list')
}

export {
  fetchCourtList
}
