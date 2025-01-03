import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImages = async (query, page, perPage = 12) => {
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

    return { results, totalPages };
  } catch (error) {
    console.error("Error fetching images:", error.message);
    throw error;
  }
};
