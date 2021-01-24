import { gql, useQuery } from "@apollo/client";
import React from "react";
import { auth } from "../firebaseConfig";

const GET_ME = gql`
  query getMe($where: users_bool_exp) {
    users(where: $where) {
      id
      firebase_id
      name
      email
      role
      created_at
      updated_at
    }
  }
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
