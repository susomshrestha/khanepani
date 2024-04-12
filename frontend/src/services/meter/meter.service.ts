import Meter from '../../models/meter';
import { makeRequest } from '../util';

const meterApi = 'http://localhost:3000/meter/';

export const getMeterByCustomerId = async (customerId: number) => {
	return makeRequest(`${meterApi}customer/${customerId}`);
};

export const updateAndGenerateBill = async (customerId: number, reading: number) => {

}
