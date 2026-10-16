import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon('postgresql://neondb_owner:npg_tfayb7OLjYS6@ep-rough-field-ahhu1a9k-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
export const db = drizzle(sql,{schema});