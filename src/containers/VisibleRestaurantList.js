import React, { Component } from 'react';
import { connect } from 'react-redux';
import RestaurantList from '../components/RestaurantList';
import { ConnectedFilter } from './Filter';


const getVisibleRestaurants = (restaurants, filter) => {
 // no filters
  if (filter.priceFilter.length === 0 && filter.locationFilter.length === 0 && filter.takeoutFilter === false) {
    return restaurants
// only takeout filter
  } else if (filter.priceFilter.length === 0 && filter.locationFilter.length === 0 && filter.takeoutFilter === true) {
    return restaurants.filter((r) => r.takeout === true)
// price, location, and takeout filter
  } else if (filter.priceFilter.length !== 0 && filter.locationFilter.length !== 0 && filter.takeoutFilter === true) {
    var filteredRestaurants1 = []
    restaurants.forEach(r => {
      if (filter.priceFilter.indexOf(r.price) !== -1 && filter.locationFilter.indexOf(r.zip_code) !== -1) {
        filteredRestaurants1.push(r)
      }
    })
    return filteredRestaurants1.filter((r) => r.takeout === true)
// price & location filters, no takeout
  } else if (filter.priceFilter.length !== 0 && filter.locationFilter.length !== 0 && filter.takeoutFilter === false) {
    var filteredRestaurants2 = []
    restaurants.forEach(r => {
      if (filter.priceFilter.indexOf(r.price) !== -1 && filter.locationFilter.indexOf(r.zip_code) !== -1) {
        filteredRestaurants2.push(r)
      }
    })
    return filteredRestaurants2
// price & takeout filters
  } else if (filter.priceFilter.length !== 0 && filter.takeoutFilter === true) {
    var filteredRestaurants3 = []
    restaurants.forEach(r => {
      if (filter.priceFilter.indexOf(r.price) !== -1) {
        filteredRestaurants3.push(r)
      }
    })
    return filteredRestaurants3.filter((r) => r.takeout === true)
  // price filter only
} else if (filter.priceFilter.length !== 0 && filter.takeoutFilter === false) {
    var filteredRestaurants4 = []
    restaurants.forEach(r => {
      if (filter.priceFilter.indexOf(r.price) !== -1) {
        filteredRestaurants4.push(r)
      }
    })
    return filteredRestaurants4
  // location and takeout filter
  }else if (filter.locationFilter.length !== 0 && filter.takeoutFilter === true){
    var filteredRestaurants5 = []
    restaurants.forEach(r => {
      if (filter.locationFilter.indexOf(r.zip_code) !== -1) {
        filteredRestaurants5.push(r)
      }
    })
    return filteredRestaurants5.filter((r) => r.takeout === true)
  // location filter only
  } else {
    var filteredRestaurants6 = []
    restaurants.forEach(r => {
      if (filter.locationFilter.indexOf(r.zip_code) !== -1) {
        filteredRestaurants6.push(r)
      }
    })
    return filteredRestaurants6
  }
}

const getHashtagNames = (hashtags) => {
  var names = []
  hashtags.map(hashtag => names.push(hashtag.name))
  return names
}

export class VisibleRestaurantList extends Component {
  render() {

    var restaurants = getVisibleRestaurants(this.props.restaurantData, this.props.visibilityFilter)
    var hashtagOptions = getHashtagNames(this.props.hashtag)

    return (
      <div className="rest-list-container">
        <ConnectedFilter  />
        <RestaurantList restaurants={restaurants} hashtagOptions={hashtagOptions}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    restaurantData: state.restaurantData,
    hashtag: state.hashtag,
    visibilityFilter: state.visibilityFilter
  }
}

export const ConnectedVisibleRestaurantList = connect(mapStateToProps)(VisibleRestaurantList)
