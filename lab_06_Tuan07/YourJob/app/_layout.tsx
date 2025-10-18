import React, { createContext, useState } from "react";
import { Stack } from "expo-router";

type UserContextType = {
  name: string;
  setName: (v: string) => void;
};

export const UserContext = createContext<UserContextType>({
  name: "",
  setName: () => {},
});

export default function Layout() {
  const [name, setName] = useState<string>("");

  return (
    <UserContext.Provider value={{ name, setName }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </UserContext.Provider>
  );
}