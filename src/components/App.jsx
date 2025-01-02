import { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImages } from "../services/api";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import toast from "react-hot-toast/headless";
import s from "./App.module.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [relatedImage, setRelatedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (image) => {
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
        const { results, totalPages } = await fetchImages(query, page);
        setTotalPages(totalPages);
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

  const handleChangQuery = (newQuery) => {
    setImages([]);
    setQuery(newQuery);
    setPage(1);
  };

  return (
    <div className={s.box}>
      <SearchBar onChangQuery={handleChangQuery} />
      <ImageGallery images={images} onClickOpenModal={openModal} />
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
