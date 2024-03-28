import { PropsWithChildren } from "react";

export type saleItemType = {
  title: string;
};

export type stepNodeType = {
  order: number;
  isActive: boolean;
  title: string;
} & PropsWithChildren;

export type productType = {
  _id: string;
  productName: string;
  categoryId: string;
  price: number;
  qty: number;
  // thumbnails: string;
  // images: string[];
  // coupon: string;
  // salePercent: number;
  description: string;
  // viewsCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type generalCategoryType = {
  generalCategoryName: string;
  _id: string;
};
export type subCategoryType = {
  _id: string;
  subCategoryName: string;
  generalCategoryId: string[];
};

export type cardProductType = {
  name: String;
  price: Number;
  discount: Number;
  quantity: Number;
  thumbnailUrl: String;
  color: String;
  merchantId: String;
};

export type ratingType = {
  productId: string;
  rate: number;
  comment: string;
};
