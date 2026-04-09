import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rsoledjvfgqcamdmulqq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzb2xlZGp2ZmdxY2FtZG11bHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2Mzg3OTIsImV4cCI6MjA5MTIxNDc5Mn0.D2-JTBIF0hCkxTo8-qUCrqoAgHi9R5XqsaREEBHWRRU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
