import { FC } from "react";
import s from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div>
      <button type="button" onClick={onClick} className={s.box}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
