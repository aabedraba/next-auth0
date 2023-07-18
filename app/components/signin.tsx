"use client"

import { signIn } from "next-auth/react";

export const SignIn = () => {
  return <button onClick={() => {
    signIn("auth0")
  }}>Sign in</button>
}
