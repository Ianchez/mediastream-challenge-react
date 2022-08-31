import * as fakeApi from '../../../../mockDB.json';

export const getGenres = () => (
  // fetch('http://localhost:3001/genres')
  //   .then(res => res.json())
  //   .catch(() => {
  //     console.log('Run yarn movie-api for fake api')
  //   })
  new Promise((resolve, reject) => {
    resolve(fakeApi.genres);
  })
);