"use client";
import { Magic } from "magic-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Change = {
  target: {
    name: string;
    value: string;
  };
};

interface User {
  username: string;
  email: string;
  phone: string;
  city: string;
}

const initialValue = {
  username: "",
  email: "",
  phone: "",
  city: "",
};
export default function useRegister() {
  const [state, setState] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUsers] = useState<User[]>([]);

  const handleChange = (e: Change) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleRegister = async () => {
    const magic = new Magic(process.env.PUBLISHABLE_API_KEY || "");

    try {
      setLoading(true);
      await magic.auth
        .loginWithEmailOTP({
          email: state.email,
        })
        .then(async () => {
          let userFound = false;
          for (let i = 0; i < user.length; i++) {
            const mail = user[i].email;
            if (state.email === mail) {
              userFound = true;
              break;
            }
          }
          if (!userFound) {
            await createUserProfile(state);
          }
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {}
  };
  useEffect(() => {
    async function fun() {
      await fetch("/api/user")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data.users || []);
        })
        .catch((error) => {
          console.error("Error fetching cars:", error);
        });
    }
    fun();
  }, [state]);

  const createUserProfile = async (state: User) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        ...state,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      await fetch("https://ticket-generation.vercel.app/user", requestOptions);
      console.log("Created");
    } catch (error) {
      console.log(error);
    }
  };

  return { handleChange, state, handleRegister, loading };
}
