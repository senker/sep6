import React from 'react';
import styles from "./SearchBar.module.scss"
import { SearchBoxProps } from '@/types/searchBoxProps.dto';

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, onChangeHandler }) => {
  return (
    <input 
      className={styles.searchBar}
      placeholder={placeholder}
      onChange={onChangeHandler}
      type="search"
    />
  );
};

export default SearchBox;