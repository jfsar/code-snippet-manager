import { supabase } from "../lib/supabase";
import { generateUsername } from "../lib/utils";

type Payload = {
  fullName: string;
  email: string;
  password: string;
};

export async function registerAccount({ fullName, email, password }: Payload) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { username: generateUsername(fullName), avatar_url: "" },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function loginUser({ email, password }: Partial<Payload>) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email as string,
    password: password as string,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
