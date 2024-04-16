import { makeRequest } from '../util';

const billApi = 'http://localhost:3000/billing/';

export const getLastBill = async (customerId: number) => {
	return makeRequest(`${billApi}${customerId}/last-bill`);
};

export const updateAndGenerateBill = async (customerId: number, meter: number) => {
	return makeRequest(`${billApi}generateBill`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ customerId, meter }),
	});
};
