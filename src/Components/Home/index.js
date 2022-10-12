import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

export default class Home extends Component {
  logout = () => {
    console.log(this.props)
    const {history} = this.props
    history.replace('/ebank/login')
    Cookies.remove('jwt_token')
  }

  render() {
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/ebank/login" />
    }
    return (
      <div className="home-bg-container">
        <div className="header">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
          />
          <button onClick={this.logout} className="logout-btn" type="button">
            Logout
          </button>
        </div>

        <h1 className="home-h">Your Flexibility, Our Excellence</h1>
        <img
          className="card-img"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    )
  }
}
