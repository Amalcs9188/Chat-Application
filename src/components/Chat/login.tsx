"use client";

import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { auth } from "@src/lib/firebase";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const userCred = await signInWithEmailAndPassword(auth, email, password);

      const idToken = await userCred.user.getIdToken();

      console.log("Firebase token 👉", idToken);

      const res = await axios.post("http://localhost:3333/auth/firebase", {
        token: idToken,
      });

      console.log("Adonis response ✅", res.data);

      alert("Login success");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2 className=" text-2xl text-black">Login</h2>

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="button" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </div>
  );
}
