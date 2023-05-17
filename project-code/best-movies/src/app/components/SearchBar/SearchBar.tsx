import React, { ChangeEventHandler } from 'react';
import styles from "./SearchBar.module.scss"

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
  onChangeHandler?: ChangeEventHandler<HTMLInputElement>;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  className,
  placeholder,
  onChangeHandler
}) => {
  return (
    <input
      className={`search-box ${className}`}
      type="search"
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  );
};

export default SearchBox;
