import { email, object, string } from 'valibot'; // 0.63 kB

// TypeScript
type LoginForm = {
  email: string;
  password: string;
};

// Valibot
const LoginSchema = object({
  email: string([email])
  password: string(),
});
