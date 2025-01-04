export interface OrderItem {
    orderId: number;
    productVariantId: number;
    quantity: number;
    total: number;
    id: number;
    productVariant:ProductVariant
  }

  export interface ProductVariant{
    name:string
    quantity:number
    total:number
    weight:number
    price:number
    product:product
  }

  export interface product{
    name:string
  }
  export interface ShippingDetail {
    fullName: string;
    address: string;
    email: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    id: number;
  }
  
  export interface Order {
    orderDate: string;         
    subTotal: number;
    orderStatus: string;
    paymentStatus: string;
    orderItems: OrderItem[];   
    shippingDetailId: number;
    shippingDetail: ShippingDetail;
    id: number;
  }