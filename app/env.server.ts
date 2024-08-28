import {z} from 'zod';

const schema = z.object({
  CLIENT_FOO: z.string(),
  NODE_ENV: z.string(),
  SESSION_SECRET: z.string(),
  SITE_URL: z.string(),
});

const clientSchema = schema.omit({
  SESSION_SECRET: true,
  SITE_URL: true,
});

export const env = schema.parse(process.env);

export const envClient = clientSchema.parse(process.env);

type Environment = z.infer<typeof clientSchema>;

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    process: {
      env: Environment;
    };
  }
}
