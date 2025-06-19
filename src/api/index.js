import { loginUrl, profileUrl, signupUrl } from '@/constants/apiConstants';

export const fetchUserProfile = async () => {
  const response = await fetch(profileUrl, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

export const loginUser = async ({ username, password }) => {
  const response = await fetch(loginUrl, {
    body: JSON.stringify({ username, password }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }
  return { success: true };
};

export const registerUser = async userData => {
  console.log('Registering user with data:', userData);

  const response = await fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch(loginUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return { success: true };
};
