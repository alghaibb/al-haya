/* eslint-disable @typescript-eslint/no-explicit-any */
export interface simpleProduct {
  _id: string;
  price: number;
  title: string;
  imageUrl: string
  slug: string;
  categoryName: string;
}

export interface fullProduct {
  _id: string;
  images: any;
  price: number;
  title: string;
  slug: string;
  categoryName: string;
  description: string;
  price_id: string;
}