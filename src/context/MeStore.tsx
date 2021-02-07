import React from "react";
import useMe from "../hooks/useMe";

export const MeStore = React.createContext<any | null>(null);

export const MeProvider = (props: any) => {
  const { data, loading, error, refetch } = useMe();

  return (
    <MeStore.Provider
      value={{
        data,
        loading,
        error,
        refetch,
      }}
    >
      {props.children}
    </MeStore.Provider>
  );
};
