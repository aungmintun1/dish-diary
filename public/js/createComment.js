//  eslint-disable 
import axios from 'axios';
export const createComment = async (text,threadId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://localhost:8000/threads/${threadId}/comments/createComment`,
      data: {
       text
      }
    });

    if (res.data.status === 'success') {
      window.location.reload();
  }

  } catch (err) {
    console.log(err.response.data.message);
  }
};


