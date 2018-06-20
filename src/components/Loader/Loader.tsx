import React from 'react';

export class Loader extends React.Component {
  render(): JSX.Element {
    return (
      <div id="loader" className="loader">
        <div className="bgContainer">
          <div className="l-s-2 blink">LOADING</div>
        </div>
      </div>
    );
  }
}
