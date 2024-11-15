export function validateEmail(email) {
  if (!email) return 'Email is required';
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email) ? '' : 'Please enter a valid email address';
}

export function validateRequired(value, fieldName) {
  return value ? '' : `${fieldName} is required`;
} 