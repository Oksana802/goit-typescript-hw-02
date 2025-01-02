import s from "./ErrorMessage.module.css";
const ErrorMessage = () => {
  return (
    <div>
      <h2 className={s.hung}>
        Something happened! <br />
        Reload the page
      </h2>
    </div>
  );
};

export default ErrorMessage;
