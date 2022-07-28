import { DisplayProductResponse } from "@/interfaces/display-product";
import fetchWrapper from "./fetch-wrapper";

export const getDisplayProducts = async () => {
  let responseAsJson;

  try {
    const response = await fetchWrapper("/api/display-products");
    responseAsJson = (await response.json()) as DisplayProductResponse;
  } catch (err) {
    console.log("ERROR: @getDisplayProducts", err);
  }

  return responseAsJson?.data;
};
