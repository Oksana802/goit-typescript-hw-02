import { Field, Form, Formik } from "formik";
import s from "./SearchBar.module.css";
import { HiMagnifyingGlass } from "react-icons/hi2";
import toast from "react-hot-toast";
import { FC } from "react";

interface SearchBarProps {
  onChangeQuery: (query: string) => void;
}
interface FormValues {
  query: string;
}
const SearchBar: FC<SearchBarProps> = ({ onChangeQuery }) => {
  const initialValues: FormValues = {
    query: "",
  };
  const handleSubmit = (values: FormValues) => {
    if (!values.query.trim()) {
      toast.success("Please enter a search term");
      return;
    }
    onChangeQuery(values.query.trim());
  };
  return (
    <header className={s.wrapper}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className={s.box}>
            <button type="submit" className={s.btn}>
              <HiMagnifyingGlass className={s.icon} />
            </button>
            <Field
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              name="query"
              className={s.field}
            />
          </div>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
