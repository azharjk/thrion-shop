import fetchWrapper from "./fetch-wrapper";
import { CheckoutRequest, CheckoutResponse } from "@/interfaces/checkout";

export const createOrder = async (req: CheckoutRequest) => {
  let responseAsJson: CheckoutResponse | undefined;

  try {
    const response = await fetchWrapper("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          ...req,
          product: req.productId,
        },
      }),
    });

    responseAsJson = (await response.json()) as CheckoutResponse;
  } catch (err) {
    console.log("ERROR: @createOrder", err, req);
  }

  return responseAsJson?.data;
};
