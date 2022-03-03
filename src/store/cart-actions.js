import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, PUT } from '../constants';
import { uiActions } from './ui-slice';

export const sendCartData = createAsyncThunk(
  'cart/sendCartData',
  async (cart, thunkApi) => {
    thunkApi.dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );
    const sendRequest = async () => {
      const response = await fetch(API_BASE_URL + '/cart.json', {
        method: PUT,
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });
      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };
    try {
      await sendRequest();
      thunkApi.dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      thunkApi.dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  }
);
// export const sendCartData = (cart) => {
//   return async (dispatch) => {
//     dispatch(
//       uiActions.showNotification({
//         status: 'pending',
//         title: 'Sending...',
//         message: 'Sending cart data!',
//       })
//     );
//     const sendRequest = async () => {
//       const response = await fetch(API_BASE_URL + '/cart.json', {
//         method: PUT,
//         body: JSON.stringify({
//           items: cart.items,
//           totalQuantity: cart.totalQuantity,
//         }),
//       });
//       if (!response.ok) {
//         throw new Error('Sending cart data failed.');
//       }
//     };
//     try {
//       await sendRequest();
//       dispatch(
//         uiActions.showNotification({
//           status: 'success',
//           title: 'Success',
//           message: 'Sent cart data successfully!',
//         })
//       );
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: 'error',
//           title: 'Error!',
//           message: 'Sending cart data failed!',
//         })
//       );
//     }
//   };
// };

export const fetchCartData = createAsyncThunk(
  'cart/fetchCartData',
  async (_, thunkApi) => {
    const response = await fetch(API_BASE_URL + '/cart.json');
    if (!response.ok) {
      thunkApi.dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
      throw new Error('Could not fetch cart data');
    }
    const data = await response.json();

    return data;
  }
);

// export const fetchCartData = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(API_BASE_URL + '/cart.json');
//       if (!response.ok) {
//         throw new Error('Could not fetch cart data');
//       }
//       const data = await response.json();

//       return data;
//     };
//     try {
//       const cartData = await fetchData();
//       dispatch(
//         cartActions.replaceCart({
//           items: cartData.items || [],
//           totalQuantity: cartData.totalQuantity || 0,
//         })
//       );
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: 'error',
//           title: 'Error!',
//           message: 'Fetching cart data failed!',
//         })
//       );
//     }
//   };
// };
