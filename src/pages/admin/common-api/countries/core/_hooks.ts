import authApi from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: () => authApi.get("https://restcountries.com/v3.1/all?fields=name"),
  })
}