import React from 'react'
import { Route, Switch } from 'react-router'
import {Home, SignUp, SignIn, Todo } from './pages/index'
import Auth from './Auth'

const Router = () => {
  return (
    <Switch>
      <Route exact path="(/)?" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Auth>
        <Route exact path="/todo" component={Todo} />
      </Auth>
    </Switch>
  )
}

export default Router
