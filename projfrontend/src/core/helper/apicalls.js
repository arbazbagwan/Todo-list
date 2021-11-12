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

export const getTodo = (belongsto) => {
  return fetch(`${API}/todo/${belongsto}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getallTodo = (belongsto) => {
  return fetch(`${API}/upcomming/${belongsto}`, {
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

export const geteditTodo = (todoid) => {
  return fetch(`${API}/gettodobyid/${todoid}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const updatetodolist = (etodoid, elist) => {
  return fetch(`${API}/updatetodo/${etodoid}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body:JSON.stringify(elist)
    
  })
    .then(response => {
      return response.json();
     
    })
    .catch(err => console.log(err));
};



