import {combineReducers} from 'redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';

// reducers always needs to return a function that return something
// when passed as a parameter 
export default combineReducers({
   posts: postsReducer,
   users: usersReducer
   
})

// rules of reducers
// 1) must return any value except undefined
// - always has to have a return statement that return some kind of value
// 2) Produces state or data to be used inside app. IE it either going to return existing state or state with new data
// first time reducer is run it returns statev1, the second time it is run the value it is initialised with
// will be last version of state.
// 3) Reducer must not reach out of itself. IE don't make an api request,
// reach into dom to get value, user input etc. It's only supposed to look
// at the state argument and action object. IE some computation on them.
//4) must not mutate it's state input argument
// ie no pop, push of array no redefining object properties etc nb) strings
// are immutable in javascript.

//immutable handy guide
//--------------------------------------------
// BAD             GOOD
//---------------------------------------------
// state.pop        state.filter(el => el !== 'hi) 
// state.push('hi)  [...state, hi]
// state[0] ='hi'   state.map(el => el === 'hi' ? 'bye' : elxw)
// state.age = 30   {...state, age: 30}
                                                // the last one is lodash
//delete state.age  {...state, age: undefined} or _.omit(state, age)

// A FUNCTION THAT REMOVES PROPETY FROM AN OBJECT - THIS IS A TRICKIESH PROBLEM. CREATES A NEW OBJECT
// const newCar = Object.keys(car).reduce((object, key) => {
//     if (key !== prop) {
//       object[key] = car[key]
//     }
//     return object
//   }, {})