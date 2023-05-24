import { ChangeEventHandler } from "react";

export interface SearchBoxProps {
    className?: string;
    placeholder?: string;
    onChangeHandler?: ChangeEventHandler<HTMLInputElement>;
  }