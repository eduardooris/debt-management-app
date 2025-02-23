// src/supabase/supabase.client.ts
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('SUPABASE_URL ou SUPABASE_KEY não definidos nas variáveis de ambiente.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
