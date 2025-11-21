
import { EmailConfig } from '@/types/email';

export function getEmailConfig(): EmailConfig {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error('Email configuration is incomplete. Please check your environment variables.');
  }

  return {
    host,
    port: parseInt(port, 10),
    secure: parseInt(port, 10) === 465,
    auth: {
      user,
      pass,
    },
  };
}

export function shouldFailOnEmailError(): boolean {
  return process.env.FAIL_ON_EMAIL_ERROR === 'true';
}
