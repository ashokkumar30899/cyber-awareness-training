export const msalConfig = {
  auth: {
    clientId: "3f67225d-550a-43b3-8dc6-7376cda88059",
    authority: "https://login.microsoftonline.com/893db92d-2b9c-400b-b342-d7e0fb5a80ad",
    redirectUri: "https://employeetraining.wissda.com/home"
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  }
};

export const loginRequest = {
  scopes: ["User.Read"]
};
