import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
const ImageGallery = ({ images, onClickOpenModal }) => {
  return (
    <div>
      <ul className={s.box}>
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onClickOpenModal={() => onClickOpenModal(image)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
