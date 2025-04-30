import 'dotenv/config';
import { z } from 'zod';

// Primero defines el schema
const envSchema = z.object({
    PORT: z.coerce.number().int().positive(),
    DATABASE_URL: z.string(),
    // NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

// De ahí generas el tipo automáticamente:
type envVars = z.infer<typeof envSchema>;

// Luego haces el parsing:
const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
    console.error(error.flatten().fieldErrors);
    throw new Error('Config validation error.');
}

// Ahora tienes `envVars` que es del tipo `EnvVars` 
const envVars: envVars = data;

export const envs = {
    PORT: envVars.PORT,
    DATABASE_URL: envVars.DATABASE_URL,
}
