import { makeRequest } from '../util';

const billApi = 'http://localhost:3000/billing/';

export const getLastBill = async (customerId: number) => {
	return makeRequest(`${billApi}${customerId}/last-bill`);
};
