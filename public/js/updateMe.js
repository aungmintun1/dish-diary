//  eslint-disable 
import axios from 'axios';

export const updateMe = async (form) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/users/updateMe',
      data: form,
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/account');
      }, 1000);
    }

  } catch (err) {
    alert('error', err.response.data.message);
  }
};


