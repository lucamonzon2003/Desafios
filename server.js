import http from './src/app.js';

const PORT = process.env.PORT

http.listen(PORT, () => console.info(`Server up and running on port ${PORT}`));