//  eslint-disable 
import axios from 'axios';

export const updateThread = async (id, question,ingredients, description,directions) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:8000/threads/updateThread/${id}`,
      data:{
        question,
        description,
        ingredients,
        directions
      }
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign(`/thread/${id}`);
      }, 1000);
    }

  } catch (err) {
    console.log('error', err.response.data.message);
  }
};


