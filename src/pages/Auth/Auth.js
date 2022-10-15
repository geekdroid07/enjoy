import React from 'react';
import Login from './components/Login';
function Auth() {
  return (
    <div className="Auth">
      <div className="Auth__welcome">
        <h2 className="Auth__welcome_title">Bienvenido a</h2>
        <h2 className="Auth__welcome_title">¡ENJOY! EXPERIENCE EVENTS</h2>
      </div>
      <div className="Auth__actions">
        <Login />
      </div>
    </div>
  );
}

export default Auth;
