import { gql } from "@apollo/client";

export const USERS_FRAGMENT = gql`
  fragment UsersPart on users {
    id
    firebase_id
    name
    email
    role
    created_at
    updated_at
  }
`;
