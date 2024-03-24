/* eslint-disable */
import axios from 'axios';
const stripe = Stripe('pk_test_51OkouIJ4pPgw30DxgN8tgYwaYgMotVCdDNnyFdSKagZtuSyeZQ3hE6bOm6vRWqtJt5WLBv3cPV0nhZRK8NQ1MO7600nAH4nQyD');

export const bookItem = async () => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/bookings/checkout-session`
    );
   
    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
  }
};
