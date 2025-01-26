import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"; // Named import

interface DecodedToken {
  userId: string;
  email: string;
  username: string; // Assuming 'username' is part of the token
  iat: number; // issued at time (from JWT standard)
  exp: number; // expiration time (from JWT standard)
}

export const decodeAndSetTokenInCookies = (token: string): void => {
  try {
    // Decode the JWT token
    const decodedToken: DecodedToken = jwtDecode(token);

    // Log the decoded token to check the structure
    console.log(decodedToken);

    // Set the decoded token data in cookies
    Cookies.set('auth_token_LearnYourSelf', token, { expires: 7, secure: true, sameSite: 'Strict' });  // Store the JWT token itself
    Cookies.set('userId_LearnYourSelf', decodedToken.userId, { expires: 7, secure: true, sameSite: 'Strict' });  // Store user ID
    Cookies.set('email_LearnYourSelf', decodedToken.email, { expires: 7, secure: true, sameSite: 'Strict' });  // Store email
    Cookies.set('username_LearnYourSelf', decodedToken.username, { expires: 7, secure: true, sameSite: 'Strict' });  // Store username
    // Optionally, store other fields from the decoded token
    // Cookies.set('iat', decodedToken.iat, { expires: 7, secure: true, sameSite: 'Strict' }); // Store issued at time
    // Cookies.set('exp', decodedToken.exp, { expires: 7, secure: true, sameSite: 'Strict' }); // Store expiration time

    // Optionally handle other logic after setting cookies (e.g., navigating to a different page)
  } catch (error) {
    console.error("Error decoding JWT token:", error);
  }
};


