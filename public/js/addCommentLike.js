//  eslint-disable 
import axios from 'axios';
export const addCommentLike = async (commentId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://localhost:8000/comments/${commentId}/commentLikes/addCommentLike`,
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


