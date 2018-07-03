import * as React from 'react';

export const SearchPanel = () => (
  <React.Fragment>
    <div className="searchpanel">
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search for..." />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button"><i className="fa fa-search" /></button>
        </span>
      </div>
    </div>
  </React.Fragment>
);
