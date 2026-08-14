export async function apiFetch<T>(
    url: string,
    options?: RequestInit,
    errorMessage = 'API request failed',
  ): Promise<T> {
    const response = await fetch(`/api${url}`, options);
  
    if (!response.ok) {
      throw new Error(errorMessage);
    }
  
    if (response.status === 204) {
      return undefined as T;
    }
  
    return response.json();
  }