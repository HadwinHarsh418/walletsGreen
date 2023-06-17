export function setUserToken(token: string) {
  localStorage.setItem('userToken', token);
}

export function getUserToken() {
  const currentToken = JSON.parse(localStorage.getItem('userToken'));

  if (currentToken && currentToken.token) {
      return  currentToken.token;
  }

  return currentToken;
}

export function removeUserToken() {
  localStorage.removeItem('userToken');
}
