export const BASE_URI =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/api/v1'
        : 'https://api-server-blog.herokuapp.com/api/v1';
export const ROOT_URL_SERVER =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : 'https://api-server-blog.herokuapp.com';
