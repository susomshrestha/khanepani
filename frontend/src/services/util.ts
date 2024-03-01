import responseCamelizerFetch from "./responseCamelizerFetch";

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