export interface SmartphoneColorAPI {
  name: string;
  value: string;
  img: string;
}
export interface SmartphoneDataAPI {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewCount: number;
  provider: string;
  colors: SmartphoneColorAPI[];
}

const API_URL = "https://6832d64fc3f2222a8cb3da6f.mockapi.io/api/v1/smartphone";

export async function fetchSmartphones(): Promise<SmartphoneDataAPI[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Không fetch được smartphone!");
  return res.json();
}