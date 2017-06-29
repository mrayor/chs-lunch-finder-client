import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Icon } from 'semantic-ui-react'
import './Recommendation.css'


class Recommendation extends Component {
  render() {
    console.log(restaurants)
    const funny_intros = ["You know the lunch room is full of weirdos. Take a break at ", "Microwave lines killing your day? Head over to ", "Indecisive much? You should go to "]
    const restaurants = this.props.restaurantData
    let rec_restaurant = restaurants[Math.floor(Math.random()*restaurants.length)];
    let intro = funny_intros[Math.floor(Math.random()*funny_intros.length)];

    return (
    <div className="recom-container">
      <div className="recom-info">
        <div className="recom-intro">
          <h1>{intro}<a href={rec_restaurant.yelp_url} className="recommended-restaurant">{rec_restaurant.name}</a>!</h1>
        </div>
      <br />
      <Grid className="restaurant-info" columns={2} divided>
        <Grid.Row>
          <Grid.Column className="restaurant-type">
            <div><Icon circular inverted color='teal' name='food' /></div>
            <div><p>{rec_restaurant.category_list}</p></div>
          </Grid.Column>

          <Grid.Column className="restaurant-price">
            <div><Icon circular inverted color='olive' name='currency' /></div>
            <p>{rec_restaurant.price}</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column className="restaurant-takeout">
            <div>{rec_restaurant.takeout ? <Icon circular inverted color='teal' name='thumbs up' /> : <Icon circular inverted color='orange' name='thumbs down' />}</div>
            <div><p>Takeout</p></div>
          </Grid.Column>

          <Grid.Column className="restaurant-delivery">
            <div>{rec_restaurant.delivery ? <Icon circular inverted color='teal' name='thumbs up' /> : <Icon circular inverted color='orange' name='thumbs down' />}</div>
            <div><p>Delivery</p></div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    restaurantData: state.restaurantData,
  }
}


export const ConnectedRecommendation = connect(mapStateToProps)(Recommendation)
