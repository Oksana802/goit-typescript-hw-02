import { FC } from "react";
import { Img } from "../App/App.types";
import s from "./ImageCard.module.css";

interface ImageCardProps {
  image: Img;
  onClickOpenModal: () => void;
}

const ImageCard: FC<ImageCardProps> = ({ image, onClickOpenModal }) => {
  return (
    <li className={s.box}>
      <img
        className={s.img_small}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={onClickOpenModal}
      />
    </li>
  );
};

export default ImageCard;
