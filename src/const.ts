const { NODE_ENV, REACT_APP_SERVICE_API_URL, REACT_APP_API_KEY } = process.env;

export const IS_DEVELOPMENT = NODE_ENV === "development";
export const SERVICE_API_URL = REACT_APP_SERVICE_API_URL;
export const API_KEY = REACT_APP_API_KEY;
