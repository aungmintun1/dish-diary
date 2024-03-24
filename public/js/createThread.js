//  eslint-disable 
import axios from 'axios';

export const createThread = async (form) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/threads/createThread',
      data: form, // Send form directly without wrapping it
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }

  } catch (err) {
    alert('error', err.response.data.message);
  }
};


