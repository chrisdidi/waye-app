import { gql, useQuery, useSubscription } from "@apollo/client";
import React from "react";
import { auth } from "../firebaseConfig";
import { USERS_FRAGMENT } from "../fragments";

const GET_ME = gql`
  subscription getMe($where: users_bool_exp) {
    users(where: $where) {
      ...UsersPart
    }
  }
  ${USERS_FRAGMENT}
`;
const useMe = () => {
  let uid = auth()?.currentUser?.uid;

  const { data, loading, error } = useSubscription(GET_ME, {
    variables: {
      where: {
        firebase_id: {
          _eq: uid,
        },
      },
    },
  });
  console.log(error, loading);

  return { data, loading, error };
};

export default useMe;
