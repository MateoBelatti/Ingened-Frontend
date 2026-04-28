import React, { type ChangeEvent } from "react";

export const createHandleChange =
  <T,>(setData: React.Dispatch<React.SetStateAction<T>>) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };