export default function fetchWrapper(url: string, init?: RequestInit) {
  return fetch(`${process.env["NEXT_PUBLIC_API_HOST"]}${url}`, init);
};
