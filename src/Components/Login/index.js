import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
  state = {userId: '', pin: '', erroeMsg: ''}

  userIDInput = event => {
    this.setState({userId: event.target.value})
  }

  pinInput = event => {
    this.setState({pin: event.target.value})
  }

  loginClick = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {
      user_id: userId,
      pin,
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const respData = await response.json()
    console.log(response)
    console.log(respData)

    if (response.ok) {
      Cookies.set('jwt_token', respData.jwt_token, {expires: 30})
      console.log(this.props)
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({erroeMsg: respData.error_msg})
    }
  }

  render() {
    const {userId, pin, erroeMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card">
          <img
            className="login-img"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <form className="login-form" onSubmit={this.loginClick}>
            <h1>Welcome Back!</h1>
            <div className="login-input-div">
              <label className="login-label" htmlFor="userId">
                User ID
              </label>
              <input
                value={userId}
                onChange={this.userIDInput}
                className="login-input"
                placeholder="Enter User ID"
                id="userId"
                type="text"
              />
            </div>
            <div className="login-input-div">
              <label className="login-label" htmlFor="pin">
                PIN
              </label>
              <input
                value={pin}
                onChange={this.pinInput}
                className="login-input"
                placeholder="Enter PIN"
                id="pin"
                type="password"
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            <p className="err-msg">{erroeMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}
