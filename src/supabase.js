import { createClient }
from "@supabase/supabase-js";

const supabaseUrl =
  "https://fzptiueyikklkwqujvnt.supabase.co";

const supabaseKey =
  "sb_publishable_pWUWuGXZMeteUrvHDgNdBg_N6HQM24Y";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );