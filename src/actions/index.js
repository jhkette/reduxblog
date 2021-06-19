// import _ from 'lodash';
import jsonPlaceholder from "../apis/jsonplaceholder";
import _ from 'lodash'

// action creators must return PLAIN JAVASCRIPT OBJECTS WITH A TYPE PROPERTY.
// This means no async/await. No return of a request to an api (ie a promise).

// Synchrounous action creator vs asynchrounous action creator
// sync always HAS ro return an object aysnc takes some time to return data so you use middleware

// redux thunk sends action to middleware, ie redux thunk.It Get called with every action
// we dispatch. With redux thunk you can return EITHER a function or an object. IF you send functino
// redux thunk will call it. If its an object it will send on the object to the reducers

export const fetchPosts = () => async (dispatch) => {
    const response = await jsonPlaceholder.get("/posts");

    dispatch({type: "FETCH_POSTS",payload: response.data});
 };
//  we add '.data' to sure we just get the array of posts , not the headers etc.



// with redux thunk you can return just an object ie comparable to a normal
// action creator. HOWEVER if YOU ARE RETURNING A FUNCTION (AS WE ARE)
// YOU CAN SEND THE ACTION TO THE REDUCER USING THE DISPATCH METHOD
// YOU CAN ALSO ADD SECOND PARAM 'getState'

// the above function is equivalent to this below just refactored
// export const fetchPosts = () => {
//     return async (dispatch) => {
//       const response = await jsonPlaceholder.get("/posts");
  
//       dispatch({type: "FETCH_POSTS",payload: response});
//     };
//   };
  

/*----------------------------IMPORTANT INFO ON MEMOISATION ---------------------------------*/

// export fetchuser with id as param returns dispatch then returns memoised fetch user 
// export const fetchUser = (id) => dispatch => _fetchUser(id,dispatch)

// //the _fetchUser variable is assigned to a memoise function
// const _fetchUser = _.memoize(async(id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({type: 'FETCH_USER', payload: response.data })
// })


// the below function does not work because every time we call outer function
// fetchUser we create a new memoised version of the inner function. The way to do it is
// to create a seperate memoised function _fetchUser as above and then call it

export const fetchUser = (id) => _.memoize(async (dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({type: 'FETCH_USER', payload: response.data })
    
})

/*---------------------------- ---------------------------------*/



// export const fetchUser = id => async dispatch => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({type: 'FETCH_USER', payload: response.data })
// }

// we use both the dispatch and getState arguments here. 
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    // we need to use await to get posts. This is because we need to
    // wait to get the users before 
    await dispatch(fetchPosts());

    // use set to get unique values from the the map function.Spread into an array.

    const userIds = [...new Set(getState().posts.map(post => post.userId))]
   

    // const userIds = _.uniq(_.map(getState().posts, 'userId'))

    userIds.forEach(id => dispatch(fetchUser(id)))

    
}