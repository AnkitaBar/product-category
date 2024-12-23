interface Dimensions {
    width: number;
    height: number;
    depth: number;
  }
  
  interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }
  
  interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  }
export interface IallProductProps {
  products:any;
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
  }
  
  export interface allProductsProps extends IallProductProps {
    // products: [IallProductProps];
    products:any
  }
  ////////////////// details
  export interface productdDetailsProps extends IallProductProps {
    products: IallProductProps;
  }

  /////////////// categories

//for product category//
export interface IproductCategoryProps {
    slug: string;
    name: string;
    url: string;
  }
  
  export interface productCategoryProps extends IproductCategoryProps {
    products: IproductCategoryProps;
  }

  ////////////////// categoty list

   

  export interface productByCategoryProps extends IallProductProps {
    data: IallProductProps;
  }
///////////////

      