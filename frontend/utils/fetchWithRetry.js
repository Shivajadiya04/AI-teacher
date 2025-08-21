// frontend/utils/fetchWithRetry.js

const fetchWithRetry = async (url, options = {}, retries = 3, delay = 1000) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 503 && retries > 0) {
        await new Promise((res) => setTimeout(res, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 2); // retry with backoff
      }
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error('Retry failed:', err);
    throw err;
  }
};

export default fetchWithRetry;
