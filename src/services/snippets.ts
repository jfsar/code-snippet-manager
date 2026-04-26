import { supabase } from "../lib/supabase";

export type Snippet = {
  title: string;
  content: string;
  syntax: string;
  tags?: string[];
  visibility?: "private" | "public" | "secret";
};

export async function addSnippet({
  title,
  content,
  syntax,
  tags,
  visibility = "public",
}: Snippet) {
  const insertData: Record<string, any> = {
    title,
    content,
    syntax,
    visibility,
  };

  if (tags && tags.length > 0) {
    insertData.tags = tags;
  }

  const { data, error } = await supabase.from("snippets").insert(insertData);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
