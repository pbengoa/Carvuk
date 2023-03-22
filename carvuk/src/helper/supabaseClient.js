
import { createClient } from '@supabase/supabase-js'


// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://watvkkzdkhyivjopjzwm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhdHZra3pka2h5aXZqb3BqendtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk0OTEwOTMsImV4cCI6MTk5NTA2NzA5M30.KOSwI783kPLrhkaysZePQoonce7EU8E2e0oen3eb9kQ'
)