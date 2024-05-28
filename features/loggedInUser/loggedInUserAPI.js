export const LoggedInUserData = 'LoggedInUserData';

export const setLoggedInUserData = (data) => ({
    type: "LoggedInUserData",
    payload: data,
});