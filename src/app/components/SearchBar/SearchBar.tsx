import React from 'react';
import { SearchBoxProps } from '@/types/searchBoxProps.dto';

const SearchBox: React.FC<SearchBoxProps> = ({ className, placeholder, onChangeHandler }) => {
  return (
    <input 
      className={className}
      placeholder={placeholder}
      onChange={onChangeHandler}
      type="search"
    />
  );
};

export default SearchBox;