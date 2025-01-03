import axios from "axios";
import { FetchRes, Img } from "../components/App/App.types";

axios.defaults.baseURL = "https://api.unsplash.com";

interface ApiFetchRes {
  results: Img[];
  total: number;
}

export const fetchImages = async (
  query: string,
  page: number,
  perPage: number = 12
): Promise<FetchRes> => {
  try {
    const response = await axios.get<ApiFetchRes>(`/search/photos`, {
      params: {
        client_id: "Opo1OXeY11YPl_Vh5V07W2pdWLleW6w5iS2PMl8kQyE",
        query,
        page,
        per_page: perPage,
      },
    });

    const { results, total } = response.data;
    const totalPages = Math.ceil(total / perPage);

    return {
      results,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching images:", (error as Error).message);
    throw error;
  }
};
