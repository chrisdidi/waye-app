import { ORDER_STATUS } from "./enum";

export type OrderType = {
  id?: number;
  user_id: number;
  created_at?: Date;
  description?: string;
  budget?: number;
  delivery_address?: string;
  delivery_place_id?: string;
  delivery_lat: number;
  delivery_lng: number;
  status?: ORDER_STATUS;
  complete_date?: Date | string;
  driver_id?: number;
  type: string;
  delivery_location: any;
};

export type MessageType = {
  id: number;
  created_at: Date;
  seen: boolean;
  sender_id: number;
  order_id: number;
  message: string;
};
