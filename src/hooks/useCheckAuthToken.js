import { useContext, useEffect, useState } from "react";

import { Context as AuthContext } from "../context/AuthContext";

const useCheckAuthToken = () => {
  const {
    state: { user, token },
    tryLocalSignin,
  } = useContext(AuthContext);

  const [didCheckAuthToken, setDidCheckAuthToken] = useState(false);

  useEffect(() => {
    tryLocalSignin();
    if (token !== null) {
      setDidCheckAuthToken(true);
    }
  }, []);

  return [didCheckAuthToken];
};

export default useCheckAuthToken;
