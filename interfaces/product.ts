export interface ProductResponse {
  data: Product;
}

export interface Product {
  id:           number;
  name:         string;
  price:        number;
  condition:    number;
  size:         string;
  minusInfo?:   string;
  thumbnailUrl: string;
  images:       Image[];
}

export interface Image {
  url: string;
}
