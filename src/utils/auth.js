import Cookies from 'js-cookie';

export const getTokenFromCookie = () => {
  return Cookies.get('token') || null;
};

export const getUserRoleFromCookie = () => {
  return Cookies.get('userRole') || null;
}; 