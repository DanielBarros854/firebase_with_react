import { createContext, useState } from "react";

import { UserLoggedInterface, UserLoggedStateInterface } from "../interface/UserLogged";

export const UserLoggedContext = createContext<UserLoggedStateInterface>({
  userLogged: null,
  setUserLogged: () => { },
});

const UserLoggedProvider = ({ children }: any) => {
  const [userLogged, setUserLogged] = useState({} as UserLoggedInterface | null)
  console.log(userLogged);
  return (
    <UserLoggedContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </UserLoggedContext.Provider>
  )
}

export default UserLoggedProvider;
