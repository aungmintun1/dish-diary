//  eslint-disable 
import axios from 'axios';

export const editCart = async (id, quantity) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:8000/carts/edit/${id}`,
      data:{
        quantity,
      }
    });

    if (res.data.status === 'success') {
        window.location.reload();
    }

  } catch (err) {
    console.log('error', err.response.data.message);
  }
};


