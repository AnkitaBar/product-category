import { allProductAPICall } from "@/api/functions/allProduct.api";
import { productByCategoryAPICall } from "@/api/functions/category.api";
import { productCategoryAPICall } from "@/api/functions/productCategory.api";
import { productDetailsAPICall } from "@/api/functions/productDetails.api";
import { getSearchedDataAPICall } from "@/api/functions/searchProducts.api";
import { allProductsProps, IallProductProps, IproductCategoryProps } from "@/typeScript/cms.interface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//for all Product//
export const allProductQuery = (): UseQueryResult<IallProductProps, unknown> => {
    return useQuery({
      queryKey: ["PRODUCTS"],
      queryFn: allProductAPICall
    });
  };

    //////////// products details ///////////////////

export const productDetailsQuery = (id:string): UseQueryResult<IallProductProps, unknown> => {
  return useQuery({
    queryKey: ["BLOGS-DETAILS",id],
    queryFn : () =>  productDetailsAPICall(id),
  });
};




//for product category//
export const productCategoryQuery = (): UseQueryResult<IproductCategoryProps, unknown> => {
  return useQuery({
    queryKey: ["PRODUCT-CATEGORY"],
    queryFn: productCategoryAPICall
  });
};

//////////////////////// category
//for product by category//
export const productByCategoryQuery = (category: string): UseQueryResult<IallProductProps, unknown> => {
  return useQuery({
    queryKey: ["PRODUCT-BY-CATEGORY", category],
    queryFn: () => productByCategoryAPICall(category),
    enabled: !!category,
  });
};


////// search

// for product searching
export const useSearchedProductQuery = (search:string):UseQueryResult<allProductsProps,unknown>=>{
  return useQuery({
      queryKey:["SEARCHED_DATA",search],
      queryFn:getSearchedDataAPICall,
      enabled:false
  })
}