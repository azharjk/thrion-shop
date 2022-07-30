export interface CheckoutRequest {
  productId: number;
  name: string;
  email: string;
  whatsappNumber: string;
  address: string;
  paymentMethod: string;
}

export interface Checkout {
  id: number;
  name: string;
  product: {
    name: string;
    price: number;
  };
}

export interface CheckoutResponse {
  data: Checkout;
}
