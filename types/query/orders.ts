export interface OrdersColumn {
      order_id: string;
      customer_name: string;
      product_name: string;
      quantity: number;
      order_total: number;
      date: Date | string;
      status: 'PENDING' | 'DELIVERED' |'SHIPPED' |'PROCESSING' |'CANCELLED';
}