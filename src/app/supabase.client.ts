import { createClient } from "@supabase/supabase-js";
import { environment } from "src/environments/environment";

const supabaseUrl = environment.supabaseUrl;
const supabasekey = environment.supabaseKey;

export const supabase = createClient(supabaseUrl, supabasekey);
