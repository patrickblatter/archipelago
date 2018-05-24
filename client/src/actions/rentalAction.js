import axios from 'axios';

export const CREATE_RENTAL = 'CREATE_RENTAL_SUCCESS';

export function createRental(userId, boatId, pricePerDay, rentalStartDate, rentalEndDate, token) {
  return async (dispatch) => {
    try {
      const data = {
        userId,
        boatId,
        pricePerDay,
        rentalStartDate,
        rentalEndDate,
      };
      const result = await axios.post(
        'http://localhost:3001/rentals', data, {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        },
      );


      if (result.status === 201) {
        dispatch({
          type: 'CREATE_RENTAL_SUCCESS',
        });
      } else {
        dispatch({
          type: 'CREATE_RENTAL_FAILED',
        });
      }
    } catch (error) {
      dispatch({
        type: 'CREATE_RENTAL_FAILED',
      });
    }
  };
}
