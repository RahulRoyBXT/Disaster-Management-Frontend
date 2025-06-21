import { loginUrl, logoutUrl, profileUrl, signupUrl } from '@/constants/apiConstants';

export const loginUser = async ({ username, password }) => {
  console.log('Logging in user with username:', username);

  const response = await fetch(loginUrl, {
    body: JSON.stringify({ username, password }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for cookies/token
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed');
  }

  const data = await response.json();
  return data;
};

export const registerUser = async userData => {
  console.log('Registering user with data:', userData);

  const response = await fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch(logoutUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Logout failed');
  }

  return { success: true };
};

export const fetchProfile = async () => {
  try {
    const response = await fetch(profileUrl, {
      method: 'GET',
      credentials: 'include', // Important for cookies/token
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
