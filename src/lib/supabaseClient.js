import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

// Cliente único de Supabase para toda la app. La sesión se persiste en
// localStorage y el enlace de acceso por correo se detecta en la URL al
// volver (detectSessionInUrl, activo por defecto).
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
