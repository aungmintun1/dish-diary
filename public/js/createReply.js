//  eslint-disable 
import axios from 'axios';
export const createReply = async (text,threadId,commentId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/threads/${threadId}/comments/reply/${commentId}`,
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


