import React, { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { populate } from "../mock/api";

const useCheckAuthToken = () => {
  const {
    state: { user, token },
    tryLocalSignin,
  } = useContext(AuthContext);

  const [didCheckAuthToken, setDidCheckAuthToken] = useState(false);

  useEffect(() => {
    tryLocalSignin();
    if (token) {
      console.log("Token", token);
      setDidCheckAuthToken(true);
    }
  }, []);

  return [didCheckAuthToken];
};

export default useCheckAuthToken;
