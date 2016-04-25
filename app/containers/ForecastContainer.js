import React, { Component } from 'react'
import Forecast from '../components/Forecast'
import { getForcast } from '../helpers/api'

class ForecastContainer extends Component {
  constructor () {
    super()
    this.state = {
      isLoading: true,
      forecastData: {}
    }
  }
  componentDidMount () {
    this.makeRequest(this.props.routeParams.city)
  }
  componentWillReceiveProps ({ routeParams }) {
    this.makeRequest(routeParams.city)
  }
  async makeRequest (city) {
    try {
      const forecastData = await getForcast(city)
      this.setState({
        isLoading: false,
        forecastData
      })
    } catch(err) {
      console.warn('Error in ForecastContainer, makeRequest()', err)
    }
  }
  handleClick (weather) {
    this.context.router.push({
      pathname: '/detail/' + this.props.routeParams.city,
      state: {
        weather
      }
    })
  }
  render () {
    return (
      <Forecast
        city={this.props.routeParams.city}
        isLoading={this.state.isLoading}
        handleClick={(weather) => this.handleClick(weather)}
        forecastData={this.state.forecastData} />
    )
  }
}

ForecastContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ForecastContainer