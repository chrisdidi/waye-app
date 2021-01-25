import { FetchPolicy, gql, useQuery } from "@apollo/client";
import { ORDER_STATUS } from "../enum";
import { ORDER_FRAGMENT } from "../fragments";

const GET_ORDERS = gql`
  query getOrders($where: order_bool_exp!) {
    order(where: $where) {
      ...OrderPart
    }
  }
  ${ORDER_FRAGMENT}
`;

interface IProps {
  status: Array<{ status: { _eq: string } } | null | undefined>;
  user_id?: number;
  driver_id?: number;
  fetchPolicy?: FetchPolicy;
}
const useOrders = ({
  status,
  user_id,
  driver_id,
  fetchPolicy = "cache-first",
}: IProps) => {
  const { data, loading, error, refetch } = useQuery(GET_ORDERS, {
    fetchPolicy: fetchPolicy,
    variables: {
      where: {
        _and: [
          Boolean(status) ? { _or: [...status] } : {},
          Boolean(user_id) ? { user_id: { _eq: user_id } } : {},
          Boolean(driver_id) ? { driver_id: { _eq: driver_id } } : {},
        ],
      },
    },
  });

  return { data, loading, error, refetch };
};

export default useOrders;
