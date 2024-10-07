"use client";

import { useWhoAmI, WhoAmIResponse } from "@/api/auth/whoami";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export interface UserDataTypes {
  id: string;
  emailAddress: string;
  role: "patient" | "doctor";
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  sex: string | undefined;
  dateOfBirth: string | undefined;
  profilePhoto: string;
}

interface UserContextTypes {
  User: WhoAmIResponse | null;
  setUser: Dispatch<SetStateAction<WhoAmIResponse | null>>;
}

const UserContext = createContext<UserContextTypes>({
  User: null,
  setUser: () => null,
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [User, setUser] = useState<WhoAmIResponse | null>(null);

  const { data } = useWhoAmI();

  React.useLayoutEffect(() => {
    if (data) {
      setUser((prevUser) => {
        if (
          prevUser?.email !== data.email ||
          prevUser?.id !== data._id ||
          prevUser?.role !== data.role
        ) {
          return {
            ...data,
            emailAddress: data.email,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            id: data._id,
            role: data.role,
          };
        }
        return prevUser;
      });
      // setUser({
      //   dateOfBirth: data.dateOfBirth,
      //   emailAddress: data.email,
      //   firstName: data.firstName,
      //   id: data._id,
      //   isEmailVerified: data.isEmailVerified,
      //   isPhoneVerified: data.isPhoneVerified,
      //   lastName: data.lastName,
      //   middleName: data.middleName,
      //   profilePhoto: data.profilePhoto,
      //   role: data.role,
      //   sex: data.sex,
      // });
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ User, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
