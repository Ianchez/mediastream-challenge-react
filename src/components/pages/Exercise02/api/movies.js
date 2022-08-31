import * as fakeApi from '../../../../mockDB.json';

export const getMovies = () => (
  // fetch('http://localhost:3001/movies?_limit=50')
  // .then(res => res.json())
  // .catch(() => {
  //     console.log('Run yarn movie-api for fake api')
  // });
  new Promise((resolve, reject) => {
    resolve(fakeApi.movies);
  })
);