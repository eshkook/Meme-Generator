import axios from "axios"

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



