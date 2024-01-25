class AuthService {
  // Check if there is a token and it's not expired
  loggedIn() {
    const token = this.getToken();
    return !!token; // You can add more sophisticated checks if needed
  }

  // Retrieve the stored token
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Store the token received from the server
  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Clear the stored token
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/login");
  }
}

export default new AuthService();
