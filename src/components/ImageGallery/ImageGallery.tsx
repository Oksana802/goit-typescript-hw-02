import { FC } from "react";
import { Img } from "../App/App.types";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Img[];
  onClickOpenModal: (image: Img) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, onClickOpenModal }) => {
  return (
    <div>
      <ul className={s.box}>
        {images.map((image, index) => (
          <ImageCard
            key={`${image.id}-${index}`}
            image={image}
            onClickOpenModal={() => onClickOpenModal(image)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
