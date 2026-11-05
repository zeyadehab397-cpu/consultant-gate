const apiUrl = import.meta.env.VITE_API_URL;

function validateApiUrl(value: string | undefined): string {
  if (!value) {
    throw new Error('VITE_API_URL is not defined');
  }

  try {
    const url = new URL(value);

    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error();
    }
  } catch {
    throw new Error('VITE_API_URL must be a valid HTTP or HTTPS URL');
  }

  return value;
}

export const env = {
  apiUrl: validateApiUrl(apiUrl),
};