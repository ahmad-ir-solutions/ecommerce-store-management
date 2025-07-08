import authApi from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface CountryOption {
  id: string;
  label: string;
  value: string;
}

export const useGetCountriesList = () => {
  return useQuery<CountryOption[]>({
    queryKey: ["countries-list"],
    queryFn: async () => {
      const res = await authApi.get("https://restcountries.com/v3.1/all?fields=name");
      return res.data
        .map((country: any) => ({
          id: country.name.common,
          label: country.name.common,
          value: country.name.common,
        }))
        .sort((a: CountryOption, b: CountryOption) => a.label.localeCompare(b.label));
    },
  });
};
