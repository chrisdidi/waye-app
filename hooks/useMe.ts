import { gql, useQuery } from "@apollo/client";
import React from "react";
import { auth } from "../firebaseConfig";
import { USERS_FRAGMENT } from "../fragments";

const GET_ME = gql`
  query getMe($where: users_bool_exp) {
    users(where: $where) {
      ...UsersPart
    }
  }
  ${USERS_FRAGMENT}
`;
const useMe = () => {
  let uid = auth()?.currentUser?.uid;

  const { data, loading, error, refetch } = useQuery(GET_ME, {
    variables: {
      where: {
        firebase_id: {
          _eq: uid,
        },
      },
    },
  });

  return { data, loading, error, refetch };
};

export default useMe;
