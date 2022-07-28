export interface DisplayProductResponse {
  data: DisplayProduct[];
}

export interface DisplayProduct {
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
