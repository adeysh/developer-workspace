import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase.auth.getSession();

  console.log("SESSION:", data);
  console.log("ERROR:", error);

  return <h1>Developer Workspace</h1>;
}
