import s from "./ImageCard.module.css";
const ImageCard = ({ image, onClickOpenModal }) => {
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
