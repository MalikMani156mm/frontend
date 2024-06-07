import styles from './MultiSelector.module.css';
import React, { useState } from 'react';
import Select from 'react-select';

const CustomSelect = ({ options, onChange, placeholderText }) => {
  const [selectAllOption, setSelectAllOption] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setSelectAllOption(selectedOptions.length === options.length);
    onChange(selectedOptions);
  };
  
  const allOptions = [
    ...options
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
    }),
  };

  return (
    <Select
      options={allOptions}
      value={selectedOptions}
      onChange={handleSelectChange}
      isMulti
      styles={customStyles}
      placeholder={placeholderText}
      isOptionDisabled={(option) => option.value === 'all' && selectAllOption}
      className={styles.customSelect}
    />
  );
};

export default CustomSelect;
