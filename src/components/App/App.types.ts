export interface Img {
  id: string;
  url: string;
  title: string;
  alt_description?: string;
  description?: string;
  likes: number;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
    location?: string;
  };
}

export interface FetchRes {
  results: Img[];
  totalPages: number;
}
