//  eslint-disable 
import axios from 'axios';

export const deleteThread = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:8000/threads/deleteThread/${id}`,
      data: null
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }

  } catch (err) {
    console.log('error', err.response.data.message);
  }
};


