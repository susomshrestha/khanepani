import { makeRequest } from '../util';

const meterApi = 'http://localhost:3000/meter/';

export const getMeterByCustomerId = async (customerId: number) => {
	return makeRequest(`${meterApi}customer/${customerId}`);
};
