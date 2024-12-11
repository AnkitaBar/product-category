
import { allProductsProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endpoints/endPoints";


export const allProductAPICall = async () => {
    const res = await axiosInstance.get<allProductsProps>(endPoints.product.allProducts)
    console.log('allProductAPICall res', res);
    return res.data
}
