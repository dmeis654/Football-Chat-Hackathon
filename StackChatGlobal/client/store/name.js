// ACTION TYPES

const UPDATE_NAME = 'UPDATE_NAME';

// ACTION CREATORS

export function updateName (name) {
  const action = { type: UPDATE_NAME, name };
  return action;
}

//Initial State
const initialState = {
  name: ""
}


// REDUCER
export default function reducer (state = initialState.name, action) {

  switch (action.type) {

    case UPDATE_NAME:
      return action.name;

    default:
      return state;
  }

}
