import { supabase } from "../lib/supabase";

export type Snippet = {
  user_id: string;
  title: string;
  content: string;
  syntax: string;
  tags?: string[];
  visibility?: "private" | "public" | "secret";
};

export async function addSnippet({
  user_id,
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
    owner_id: user_id,
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

export async function getSnippetsByOwner(owner: string) {
  const { data, error } = await supabase
    .from("snippets")
    .select("*")
    .eq("owner_id", owner);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getSnippetById(id: string) {
  const { data, error } = await supabase
    .from("snippets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateSnippet(
  id: string,
  {
    title,
    content,
    syntax,
    tags,
    visibility,
  }: Partial<
    Pick<Snippet, "title" | "content" | "syntax" | "tags" | "visibility">
  >,
) {
  const updateData: Record<string, any> = {};

  if (title) updateData.title = title;
  if (content) updateData.content = content;
  if (syntax) updateData.syntax = syntax;
  if (tags) updateData.tags = tags;
  if (visibility) updateData.visibility = visibility;

  const { error } = await supabase
    .from("snippets")
    .update(updateData)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return id;
}

export async function deleteSnippet(id: string) {
  const { error } = await supabase.from("snippets").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
