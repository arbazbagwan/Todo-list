import {API} from '../../backend'

export const createTodo = user => {
  return fetch(`${API}/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body:JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const getTodo = () => {
  return fetch(`${API}/todo`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getallTodo = () => {
  return fetch(`${API}/upcomming`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteTodo = (todoId) => {
  return fetch(`${API}/delete/${todoId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};



