import { FC, useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../../services/api";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import toast from "react-hot-toast/headless";
import s from "./App.module.css";
import { FetchRes, Img } from "./App.types";

const App: FC = () => {
  const [images, setImages] = useState<Img[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [relatedImage, setRelatedImage] = useState<Img | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = (image: Img) => {
    setIsOpen(true);
    setRelatedImage(image);
  };

  const closeModal = () => {
    setIsOpen(false);
    setRelatedImage(null);
  };

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { results, totalPages }: FetchRes = await fetchImages(
          query,
          page
        );
        setTotalPages(totalPages);
        if (results.length === 0) {
          toast.error("No images found for your search. Try another query.");
        }
        setImages((prev) => [...prev, ...results]);
        if (totalPages === page) {
          toast.success("Wow! You have already uploaded all the images.");
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleChangeQuery = (newQuery: string): void => {
    setImages([]);
    setQuery(newQuery);
    setPage(1);
  };

  return (
    <div className={s.box}>
      <SearchBar onChangeQuery={handleChangeQuery} />
      <ImageGallery images={images} onClickOpenModal={openModal} />
      {images.length === 0 && !isLoading && !isError && query.trim() && (
        <p className={s.noResults}>
          No images found for your search "{query}". Try another query.
        </p>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />
      )}
      {isError && <ErrorMessage />}
      <ImageModal isOpen={isOpen} image={relatedImage} onClose={closeModal} />
    </div>
  );
};

export default App;
