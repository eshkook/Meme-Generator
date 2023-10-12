import axios from "axios"

export function getPosts() {
  return axios
    .get('https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/posts/', { params: { _sort: "title" } }) // sorting by title
    .then(res => res.data)
}

// export function getPost(id) {
//   return axios.get(`https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/posts/${id}`).then(res => res.data)
// }

export async function getPost(id) {
  try {
    const response = await axios.get(`https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/posts/${id}`);

    if (response.status === 200) {
      return response.data;
    } else {
      // Handle non-200 responses
      console.error(`Error: Received status code ${response.status}`);
      throw new Error(`Error: Received status code ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
      throw error;  // Propagate the error to the caller
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
      throw error;  // Propagate the error to the caller
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
      throw error;  // Propagate the error to the caller
    }
  }
}


export function createPost({ title, body }) {
  return axios
    .post("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/posts/", {
      title,
      body,
      userId: 1,
      id: Date.now(),
    })
    .then(res => res.data)
}

export function getPostsPaginated(page) {
  return axios
    .get("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/posts", {
      params: { _page: page, _sort: "title", _limit: 2 },
    })
    .then(res => {
      const hasNext = page * 2 <= parseInt(res.headers["x-total-count"])
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        posts: res.data,
      }
    })
}



