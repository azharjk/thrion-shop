export default function fetchWrapper(url: string) {
  return fetch(`${process.env["NEXT_PUBLIC_API_HOST"]}${url}`);
};
