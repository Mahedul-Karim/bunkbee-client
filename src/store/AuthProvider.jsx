import React, { useEffect } from "react";
import { useAxios } from "@/hooks/useAxios";
import { auth } from "@/lib/config/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useStore } from "./Provider";

const AuthProvider = ({ children }) => {
  const { setIsLoading,  handleUser } = useStore();

  const { axiosInstance } = useAxios();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const providerData = currentUser?.providerData?.[0];

      if (!providerData) {
        setIsLoading(false);
        return;
      }

      const email = providerData?.email;

      const { data } = await axiosInstance({
        url: "user/me",
        data: {
          email,
        },
        method: "POST",
      });

      if (!data.user) {
        setIsLoading(false);
        return;
      }

      handleUser(data?.user, data?.token);
    });

    return () => unSubscribe();
  }, []);

  return children;
};

export default AuthProvider;
