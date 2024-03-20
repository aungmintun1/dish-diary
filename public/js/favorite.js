//  eslint-disable 
import axios from 'axios';
export const favorite = async (threadId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:8000/users/addFavorites/${threadId}`,
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


