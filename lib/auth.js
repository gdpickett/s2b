// mock login and logout
export function login() {
    // add cookie
    document.cookie = "salon2bomb";
  }
  export function logout() {
    // delete cookie
    document.cookie = "salon2bomb=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }