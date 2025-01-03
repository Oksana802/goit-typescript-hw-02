import axios from "axios";
import { FetchRes, Img } from "../components/App/App.types";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImages = async (
  query: string,
  page: number,
  perPage: number = 12
): Promise<FetchRes> => {
  try {
    const response = await axios.get(`/search/photos`, {
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
      results: results.map(
        (image: any): Img => ({
          id: image.id,
          url: image.urls.small,
          title: image.alt_description || "Untitled",
          alt_description: image.alt_description || null,
          description: image.description || null,
          likes: image.likes || 0,
          urls: {
            small: image.urls.small,
            regular: image.urls.regular,
          },
          user: {
            name: image.user.name,
            location: image.user.location || null,
          },
        })
      ),
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching images:", (error as Error).message);
    throw error;
  }
};
