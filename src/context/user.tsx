import { createContext, useState } from "react";

import { UserLoggedContextProps, UserLoggedInterface, UserLoggedStateInterface } from "../interface/UserLogged";

const initial_value = {
  userLogged: {} as UserLoggedInterface,
  setUserLogged: () => { },
}

export const UserLoggedContext = createContext<UserLoggedStateInterface>(initial_value);

const UserLoggedProvider = ({ children }: UserLoggedContextProps) => {
  const [userLogged, setUserLogged] = useState(initial_value.userLogged)

  return (
    <UserLoggedContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </UserLoggedContext.Provider>
  )
}

export default UserLoggedProvider;
