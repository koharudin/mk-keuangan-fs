export const getToken = () => localStorage.getItem('app_tokenx');

export const isLoggedIn = () => !!getToken();

export const logout = () => {
    console.log("logging out...");
    debugger
    localStorage.removeItem('anak');
    localStorage.removeItem('app_tokenx');
};
