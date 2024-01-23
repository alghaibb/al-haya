// Full name validator
export const validateFullName = (fullName: string): boolean => {
  // Minimum 3 characters, maximum can be set as per requirement
  const minLength = 3;
  const maxLength = 100;
  return fullName.length >= minLength && fullName.length <= maxLength;
};

// Email validator
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password Validator for Signup
export const validatePasswordOnSignup = (password: string): boolean => {
  // Minimum eight characters, at least one letter, one number, and one special character
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return passwordRegex.test(password);
};

// Password Validator for Login
export const validatePasswordOnLogin = (password: string): boolean => {
  return password.length > 0; // Example: Basic check for non-empty
};
