import React from "react";
import useMe from "../hooks/useMe";

export const MeStore = React.createContext<any | null>(null);

export const MeProvider = (props: any) => {
  const { data, loading, error } = useMe();

  return (
    <MeStore.Provider
      value={{
        data,
        loading,
        error,
      }}
    >
      {props.children}
    </MeStore.Provider>
  );
};
