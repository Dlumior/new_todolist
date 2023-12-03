export type FetchOptions = {
  method: string;
  headers?: { [key: string]: string };
  body?: string;
};

export function createFetcher(baseUrl: string) {
  async function fetchData<T>(url: string, options?: FetchOptions): Promise<T> {
    try {
      const response = await fetch(`${baseUrl}${url}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  return fetchData;
}
