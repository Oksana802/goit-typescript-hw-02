import ReactModal from "react-modal";
import s from "./imageModal.module.css";

import { FC } from "react";

import { Img } from "../App/App.types";

ReactModal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Img | null;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={s.overlay}
      className={s.content}
      contentLabel="Image Modal"
    >
      {image && (
        <div className={s.modalContent}>
          <img
            className={s.img_modal}
            src={image.urls.regular}
            alt={image.alt_description || "Image"}
          />
          <ul className={s.list}>
            <li>
              Author: {image.user.name} ({image.user.location || "Unknown"})
            </li>
            <li>{image.description || "No description available"}</li>
            <li>Likes: {image.likes}</li>
          </ul>
        </div>
      )}
    </ReactModal>
  );
};

export default ImageModal;
