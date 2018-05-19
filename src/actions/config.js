export const fetchStream = () => (dispatch) => axios.get('/api/fetch/stream')
  .then( response => {
      dispatch({
       type: types.STREAM_FETCH,
       payload: response.data.streams
      });
  });
