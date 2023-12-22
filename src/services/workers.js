import api from '../api.js';

export const getWorkerDemonstrative = async (id, month = null) => {
  let url = `/finance/payment/${id}`;
  
  if (month !== null) {
      url += `?month=${month}`;
  }

  const request = await api.get(url)
  return { data: request.data.data.info, status: request.data.status };
}