import responseCamelizerFetch from './responseCamelizerFetch';
import NepaliDate from 'nepali-date-converter';

export const makeRequest = async (url: string, options?: RequestInit) => {
	try {
		const customFetch = responseCamelizerFetch(window.fetch);
		const response = await customFetch(url, options);

		return response;
	} catch (error) {
		console.error('API Error:', error);
		throw error;
	}
};

export const getDate = (date: string, end: boolean = false) => {
	const year = new NepaliDate(date).getYear();
	const month = new NepaliDate(date).getMonth();
	if (end) {
		return new NepaliDate(year, month + 1, 0).format('YYYY-MM-DD');
	}
	return new NepaliDate(year, month, 1).format('YYYY-MM-DD');
};
