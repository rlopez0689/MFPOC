export interface ApiUser {
  id: number;
  name: string;
  email: string;
  website: string;
  company?: { catchPhrase?: string };
}

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchUser(userId: number): Promise<ApiUser> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);
  if (!response.ok) throw new Error(`Could not load user ${userId} (HTTP ${response.status})`);
  return response.json() as Promise<ApiUser>;
}
