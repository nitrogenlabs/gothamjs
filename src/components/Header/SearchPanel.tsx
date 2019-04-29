/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import React from 'react';

export const SearchPanel = () => (
  <div className="searchpanel">
    <div className="input-group">
      <input type="text" className="form-control" placeholder="Search for..." />
      <span className="input-group-btn">
        <button className="btn btn-default" type="button"><i className="fa fa-search" /></button>
      </span>
    </div>
  </div>
);
