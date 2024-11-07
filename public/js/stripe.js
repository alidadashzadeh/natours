/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  const stripe = Stripe(
    'pk_test_51QGtctCMILwNG4MvqfB9TrqqFmjcHg5145Mu3MSEWHiHSiXxjaOTPnimDH0Hgv0p3hE1FnH5xDhmYn8CGPfCz8g200YpG8VzUx'
  );

  try {
    // 1.get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    //   2.create checkout form and charge credit card

    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    showAlert('error', err);
  }
};
