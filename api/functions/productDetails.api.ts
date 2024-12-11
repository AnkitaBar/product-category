import { productdDetailsProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endpoints/endPoints";

export const productDetailsAPICall = async (id:string) => {
    const res = await axiosInstance.get<productdDetailsProps>(`${endPoints.product.singleProduct}/${id}`)
    console.log('blogDetailsAPICall res',res)
    return res.data;
}