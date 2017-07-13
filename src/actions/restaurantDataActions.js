import "isomorphic-fetch"

import { stopFetchingData } from './fetchingDataActions'
import { setRecommendation } from './recommendationActions'


const receiveRestaurantData = restaurantData => {
  return {
    type: 'RECEIVE_RESTAURANT_DATA',
    restaurantData
  };
}

export const fetchRestaurantData = () => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/api/restaurants`)
    .then(res => res.json())
    .then(restaurantData => {
      dispatch(receiveRestaurantData(restaurantData))
      dispatch(stopFetchingData())
      dispatch(setRecommendation(restaurantData[Math.floor(Math.random()*restaurantData.length)]))
    })
  }
}

const updateRestaurantData = restaurantData => {
  return {
    type: 'UPDATE_RESTAURANT_DATA',
    restaurantData
  };
}

export const updateRestaurant = (updatedRestaurant) => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/api/restaurants/${updatedRestaurant.id}`,
    {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRestaurant)
    }).then(response => response.json())
      .then(responseRestaurantData => {
        dispatch(updateRestaurantData(responseRestaurantData))
    })
  }
}
