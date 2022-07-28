import fetchWrapper from "./fetch-wrapper";
import { ProductResponse } from "@/interfaces/product";

export const getProduct = async (pid: number) => {
  // NOTE: In the DB we use only number for the `id`
  //       so for now is safe to do this.
  if (isNaN(pid)) {
    return null;
  }

  let responseAsJson;

  try {
    const response = await fetchWrapper(`/api/products/${pid}`);
    if (response.status === 404) return null;

    responseAsJson = (await response.json()) as ProductResponse;
  } catch (err) {
    console.log("ERROR: @getProduct", err);
  }

  return responseAsJson?.data;
};
