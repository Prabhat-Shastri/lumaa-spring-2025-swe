import { useAuth } from './useAuth';

export const useApi = () => {
  const { getToken } = useAuth();
  const baseUrl = process.env.REACT_APP_API_URL;

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  });

  const handleResponse = async (response: Response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || 'API Error');
    }
    return data;
  };

  const api = {
    get: async (endpoint: string) => {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: authHeaders(),
      });
      return handleResponse(response);
    },

    post: async (endpoint: string, body: any) => {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      return handleResponse(response);
    },

    put: async (endpoint: string, body: any) => {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      return handleResponse(response);
    },

    delete: async (endpoint: string) => {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      return handleResponse(response);
    },
  };

  return api;
}; 