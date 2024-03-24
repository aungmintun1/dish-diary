//  eslint-disable 
import axios from 'axios';

export const deleteCart = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/carts/deleteItem/${id}`
      
    });

    if (res.data.status === 'success') {
        window.location.reload();
    }

  } catch (err) {
    console.log('error', err.response.data.message);
  }
};


