//  eslint-disable 
import axios from 'axios';
export const addThreadLike = async (threadId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/threads/${threadId}/likes/addLike`,
      data: {
       
      }
    });

    if (res.data.status === 'success') {
      window.location.reload();
  }

  } catch (err) {
    console.log(err.response.data.message);
  }
};


