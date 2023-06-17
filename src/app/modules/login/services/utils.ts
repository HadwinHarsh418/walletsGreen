export const errorCheck = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(response.error);
  }
};

export const isSetInput = (element, defaultVal) => {
  if (element && element.value) {
    return element.value;
  }
  return defaultVal;
};
