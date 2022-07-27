import { ReactNode } from "react";

export interface UserLoggedInterface {
  uid: string,
  email: string | null,
  name: string | null,
  office: string | null,
  status: boolean | null,
}

export interface UserLoggedStateInterface {
  userLogged?: UserLoggedInterface,
  setUserLogged: (newState: UserLoggedInterface) => void,
}

export type UserLoggedContextProps = {
  children: ReactNode
}
