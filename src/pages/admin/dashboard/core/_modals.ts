export interface ITopSellingProduct {
  _id: string;
  productName: string;
  productType: string;
  sku: string;
  inventory: number;
  priceIncludesVat: boolean;
  warehouse: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  brand?: string;
  ean?: string;
  height?: number;
  imageurl?: string;
  length?: number;
  price: number;
  rrp?: number;
  taxClass?: number;
  upc?: string;
  weight?: number;
  width?: number;
  totalSales: number;
  totalRevenue: number;
}

export interface IProductDetails {
  _id: string;
  productName: string;
  sku: string;
  price: number;
}

export interface IChannelDetails {
  _id: string;
  channelId: string;
  channelName: string;
}

export interface IOrderStat {
  _id: string;
  productDetails: IProductDetails;
  channelDetails: IChannelDetails;
  taxTotal: number;
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
} 