import React from 'react';

import classes from './SelectLanguage.module.css';

const SelectLanguage = (props) => {

  return (
    <select
      className={classes['language-select']}
      onChange={props.languageKeyHandler}
    >
      <option value={''}>{props.placeholder}</option>
      {props.languagesList.map((language) => {
        return (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectLanguage;
