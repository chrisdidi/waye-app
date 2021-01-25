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

export const ADVERTISEMENTS_FRAGMENT = gql`
  fragment AdvertisementsPart on advertisements {
    id
    image_url
    title
    description
    link
  }
`;

export const ORDER_FRAGMENT = gql`
  fragment OrderPart on order {
    id
    user_id
    created_at
    description
    budget
    delivery_address
    delivery_place_id
    delivery_lat
    delivery_lng
    target_address
    target_place_id
    target_lat
    target_lng
    status
    complete_date
    driver_id
  }
`;
