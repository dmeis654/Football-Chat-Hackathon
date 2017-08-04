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
          <option value="English"> English </option>
          <option value="Spanish"> Spanish </option>
          <option value="French"> French </option>
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
