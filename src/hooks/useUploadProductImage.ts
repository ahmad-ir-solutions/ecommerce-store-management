// hooks/useUploadProductImage.ts
import authApi from '@/lib/axios';
import { useMutation } from "@tanstack/react-query";

export const useUploadProductImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await authApi.post("/upload/product-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.urls[0]; // return the uploaded image URL
    },
  });
};
