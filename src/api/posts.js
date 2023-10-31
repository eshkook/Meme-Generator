import axios from "axios"

// export function signup_post({ username, password, hobbies, age }) {
//   return axios
//     .post("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/signup/", {
//       username,
//       password,
//       hobbies,
//       age
//     })
//     .then(res => {
//       if (!res.status || res.status < 200 || res.status >= 300) {
//         // Throw an error if the status code is not in the 2xx range
//         throw new Error(`Request failed with status code ${res.status}`);
//       }
//       return res.data;
//     })
//     .catch(error => {
//         // Propagate the error to react-query
//         throw error.response ? error.response.data : new Error('Network error');
//     });
// }

import axios from 'axios';

export function signup_post({ username, password, hobbies, age }) {
  return axios
    .post("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/signup/", {
        username,
        password,
        hobbies,
        age
    })
    .then(res => res.data)
    .catch(error => {
        // Propagate the error to react-query
        throw error.response ? error.response.data : new Error('Network error');
    });
}

export function login_post({ username, password }) { 
  return axios
      .post("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/login/", {
          username,
          password
      })
      .then(res => res.data)
      .catch(error => {
          // Propagate the error to react-query
          throw error.response ? error.response.data : new Error('Network error');
      });
}

// export function logout_post() { 
//   return axios.post("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/logout/")
//       .then(res => res.data);
// }

export function logout_post() { 
  return axios
    .post("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/logout/")
    .then(res => {
      if (!res.status || res.status < 200 || res.status >= 300) {
        // Throw an error if the status code is not in the 2xx range
        throw new Error(`Request failed with status code ${res.status}`);
      }
      return res.data;
    })
    .catch(error => {
        // Propagate the error to react-query
        throw error.response ? error.response.data : new Error('Network error');
    });
}

export function get_response_count() {
  return axios
    .get('https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/getresponsecount/', { timeout: 5000 })
    .then(res => res.data)
    .catch(error => {
        // Propagate the error to react-query
        throw error.response ? error.response.data : new Error('Network error');
    });
}

export function getImage() {
  return axios
  .get('https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/image/', { timeout: 5000 })
  .then(res => res.data)
}

export function getPosts() {
  return axios
    .get('https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/posts/', { params: { _sort: "title" } }) // sorting by title
    .then(res => res.data)
}

export function getPost(id) {
  return axios.get(`https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/posts/${id}`)
    .then(res => res.data)
    .catch(error => {
      if (error.response && error.response.status === 404) {
        throw new Error("No such post");
      } else {
        throw error;
      }
    });
}

export function createPost({ title, body, userId }) {
  return axios
    .post("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/posts/", {
      title,
      body,
      userId,  // include userId in the request payload
    })
    .then(res => res.data)
}




