import { useState } from "react";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <input
      value={text}
      onChange={handleChange}
      placeholder={placeholder}
      className="input"
    />
  );
};

export default SearchBar;
