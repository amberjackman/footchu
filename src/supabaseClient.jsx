import { createClient } from "@supabase/supabase-js";

// require("dotenv").config();

const supabaseUrl = "https://ztvfxkwkmkcfbpfugekr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dmZ4a3drbWtjZmJwZnVnZWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMjIxMzYsImV4cCI6MjAzNjY5ODEzNn0.PT6Mi1mChRY-s4sdImnFH2OHiZmUBZhUurPphJjalrk";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
