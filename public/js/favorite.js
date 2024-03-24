//  eslint-disable 
import axios from 'axios';
export const favorite = async (threadId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/users/addFavorites/${threadId}`,
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


