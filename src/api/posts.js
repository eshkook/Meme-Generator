import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export function signup_post({ username, password, hobbies, age }) {
  const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie
  return axios
    .post("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/signup/", {
      username,
      password,
      hobbies,
      age
    }, {
      headers: csrfToken ? { 'X-CSRFToken': csrfToken } : undefined
    })
    .then(res => res.data)
    .catch(error => {
      // Propagate the error to react-query
      throw error.response ? error.response.data : new Error('Network error');
    });
}

export function login_post({ username, password }) {
  const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie

  return axios
    .post("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/login/", {
      username,
      password
    }, {
      headers: csrfToken ? { 'X-CSRFToken': csrfToken } : undefined
    })
    .then(res => res.data)
    .catch(error => {
      throw error.response ? error.response.data : new Error('Network error');
    });
}

export function logout_post() {
  const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie
  return axios
    .post(
      "https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/logout/",
      {}, // Data payload should be empty for logout
      {
        headers: csrfToken ? { 'X-CSRFToken': csrfToken } : undefined
      }
    )
    .then(res => res.data)
    .catch(error => {
      throw error.response ? error.response.data : new Error('Network error');
    });
}

export function delete_post() {
  const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie
  return axios
    .delete( // Changed from .post to .delete
      "https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/delete/",
      {
        headers: csrfToken ? { 'X-CSRFToken': csrfToken } : undefined
      }
    )
    .then(res => res.data)
    .catch(error => {
      throw error.response ? error.response.data : new Error('Network error');
    });
}

export function post_response_count(count) {
  const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie

  return axios
    .post(
      'https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/getresponsecount/',
      { count },
      {
        headers: csrfToken ? { 'X-CSRFToken': csrfToken } : undefined
      }
    )
    .then(res => res.data)
    .catch(error => {
      throw error.response ? error.response.data : new Error('Network error');
    });
}

export function get_random() {
  return axios
    .get('https://your-backend-domain.com/api/random/')
    .then(res => parseInt(res.data, 10)) // Parse the response data as an integer
    .catch(error => {
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




