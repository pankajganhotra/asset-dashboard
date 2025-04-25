import axios, { AxiosError } from "axios";

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWithRetry = async (
  url: string,
  retries = 3,
  delayTime = 1000
) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 429) {
          console.log(
            `Rate limit exceeded. Retrying in ${delayTime / 1000}s...`
          );
        } else {
          console.error(`Error fetching data: ${axiosError.message}`);
          throw axiosError;
        }
      } else {
        console.error("Unknown error:", error);
        throw error;
      }

      attempt++;
      await delay(delayTime);
      delayTime *= 2;
    }
  }

  throw new Error("Maximum retry attempts reached");
};
