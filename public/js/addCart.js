//  eslint-disable 
import axios from 'axios';

export const addCart = async (id, quantity,size) => {
  try {

    const res = await axios({
      method: 'PATCH',
      url: `/carts/addToCart/${id}`,
      data:{
        quantity,
        size
      }
    });

    
    if (res.data.status === 'success') {
        location.reload();
        location.assign(`/product/${id}/#cart`);
      
      }
    

  } catch (err) {
    console.log('error', err.response.data.message);
  }
};


