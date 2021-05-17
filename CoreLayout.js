import React from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Player from '../components/Player';

function CoreLayout({ children , history }) {
  return (
    <div className="main">
      <SideBar />
      <div className="main__content">
        <Header history={history} />
        <div className="main__content__child">
        <h1>f</h1>
        </div>
      </div>
      <Player />
    </div>
  );
}

export default CoreLayout;
