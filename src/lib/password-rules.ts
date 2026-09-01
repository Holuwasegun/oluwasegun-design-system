export const PASSWORD_RULES = [
  { id: 'minLength', label: 'Minimum of 8 characters', test: (pw: string) => pw.length >= 8 },
  { id: 'lowercase', label: 'Contains a lowercase letter', test: (pw: string) => /[a-z]/.test(pw) },
  { id: 'uppercase', label: 'Contains an uppercase letter', test: (pw: string) => /[A-Z]/.test(pw) },
  { id: 'number', label: 'Contains a number', test: (pw: string) => /[0-9]/.test(pw) },
  { id: 'special', label: 'Contains a special character (#@>^*)', test: (pw: string) => /[#@>^*]/.test(pw) },
] as const;

export function isStrongPassword(password: string): boolean {
  return PASSWORD_RULES.every((rule) => rule.test(password));
}