import React from 'react';

export const AppWithLayout = ({Component, ...props}) => {
  return (
    <>
      <nav className="top-header navbar navbar-expand-lg navbar-light bg-light" style={{marginBottom: 16}}>
        <span className="navbar-brand">
          <img src="/itenium.png" alt="itenium logo" style={{marginLeft: 16}} />
        </span>
        <div className="navbar-collapse collapse" id="basic-navbar-nav">
          <div className="mr-auto navbar-nav">
            <a className="nav-link header-link" href="/">Fetch</a>
          </div>
        </div>
      </nav>
      <div className="container">
        <Component {...props} />
      </div>
    </>
  );
};
