import { SmartphoneDataAPI, SmartphoneColorAPI } from "./api";

export interface SmartphoneColor {
  name: string;
  value: string;
  img: any;
}
export interface SmartphoneData {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewCount: number;
  provider: string;
  colors: SmartphoneColor[];
  defaultImg: any;
}

// Map tên file ảnh sang require local
const imgMap: Record<string, any> = {
  "vs_silver.png": require("../assets/vs_silver.png"),
  "vs_red.png": require("../assets/vs_red.png"),
  "vs_black.png": require("../assets/vs_black.png"),
  "vs_blue.png": require("../assets/vs_blue.png")
  // thêm các ảnh khác nếu có
};

export function mapSmartphoneFromApi(api: SmartphoneDataAPI): SmartphoneData {
  return {
    ...api,
    defaultImg: imgMap[api.colors[0]?.img] ?? null,
    colors: api.colors.map((c: SmartphoneColorAPI): SmartphoneColor => ({
      ...c,
      img: imgMap[c.img] ?? null,
    })),
  };
}