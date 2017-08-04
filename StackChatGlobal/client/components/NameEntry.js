import React from 'react';
import { connect } from 'react-redux';
import { updateName } from '../store';
import { updateLanguage } from '../store';

function NameEntry (props) {

  const { name, lang, handleNameChange, handleLanguageChange } = props;

  return (
    <div>
      <form className="form-inline">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
          onChange={handleNameChange}
          value={name}
        />
      </form>
      <select onChange={handleLanguageChange}>
          <option value="" disabled selected>Select your Language</option>
          <option value="en"> English </option>
          <option value="es"> Spanish </option>
          <option value="fr"> French </option>
          <option value="de"> German </option>
          <option value="ar"> Arabic </option>
          <option value="hy"> Armenian </option>
          <option value="bg"> Bulgarian </option>
          <option value="zh-CN"> Chinese </option>
          <option value="cs"> Czech </option>
          <option value="fi"> Finnish </option>
          <option value="el"> Greek </option>
          <option value="iw"> Hebrew </option>
          <option value="hi"> Hindi </option>
          <option value="hu"> Hungarian </option>
          <option value="id"> Indonesian </option>
          <option value="it"> Italian </option> 
          <option value="ja"> Japanese </option> 
          <option value="ko"> Korean </option>
          <option value="no"> Norwegian </option> 
          <option value="pl"> Polish </option>
          <option value="pt"> Portuguese </option>
          <option value="ru"> Russian </option> 
          <option value="sv"> Sweedish </option>
          <option value="tr"> Turkish </option>
          <option value="uk"> Ukrainian </option> 
          <option value="vi"> Vietnamese </option> 
      </select>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    name: state.name,
    language: state.language
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleNameChange (evt) {
      dispatch(updateName(evt.target.value));
    },
    handleLanguageChange (evt) {
      dispatch(updateLanguage(evt.target.value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NameEntry);
