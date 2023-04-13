type ErrorResponse = {
  response: {
    data: {
      message: string;
    }
  };
  message: string;
}

const getError = (err: ErrorResponse): string => 
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;

export { getError };