const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    ".env is missing the definition for REACT_APP_API_BASE_URL environment variable"
  );
}

export { API_BASE_URL };
