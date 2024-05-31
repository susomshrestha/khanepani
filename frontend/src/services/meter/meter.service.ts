import { makeRequest } from '../util';

const meterApi = 'http://localhost:5001/meter/';

export const getMeterByCustomerId = async (customerId: number) => {
	return makeRequest(`${meterApi}customer/${customerId}`);
};
