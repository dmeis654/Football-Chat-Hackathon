// ACTION TYPES
const UPDATE_LANGUAGE = "UPDAGE_LANGUAGE"

// ACTION CREATORS

export function updateLanguage (language) {
  const action = { type: UPDATE_LANGUAGE, language };
  return action;
}

//Initial State
const initialState = {
  language: ""
}


// REDUCER
export default function reducer (state = initialState.language, action) {

  switch (action.type) {

    case UPDATE_LANGUAGE:
      return action.language

    default:
      return state;
  }

}
