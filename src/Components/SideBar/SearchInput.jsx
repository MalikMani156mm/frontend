import React from 'react';
import styles from "./SideBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchInput = () => {
  return (
    <form className="d-flex align-items-center gap-2">
      <input 
        type="text" 
        placeholder="Search…" 
        className="form-control rounded-pill" 
      />
      <button 
        type="submit" 
        className={`btn ${styles['btn-circle']} ${styles['bg-sky-500']} text-white`}
      >
        <FontAwesomeIcon icon={faSearch} className="w-100 h-100"/>
      </button>
    </form>
  )
}

export default SearchInput