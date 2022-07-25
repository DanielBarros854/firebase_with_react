import { Dispatch, SetStateAction } from "react";

export interface UserLoggedInterface {
  uid: string,
  email: string | null,
  name: string | null,
  office: string | null,
  status: boolean | null,
}

export interface UserLoggedStateInterface {
  userLogged: UserLoggedInterface | null,
  setUserLogged: Dispatch<SetStateAction<UserLoggedInterface | null>>,
}
