export const makeRequest = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};