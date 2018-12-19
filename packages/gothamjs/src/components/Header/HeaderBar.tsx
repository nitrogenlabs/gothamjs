/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import * as React from 'react';

import {NavTabs} from './NavTabs';
import {SearchPanel} from './SearchPanel';
import {TabPanes} from './TabPanes';

export const HeaderBar = () => (
  <React.Fragment>
    <div className="headerbar">
      <a id="menuToggle" className="menutoggle"><i className="fa fa-bars" /></a>
      <SearchPanel />

      <div className="header-right">
        <ul className="headermenu">
          <li>
            <div id="noticePanel" className="btn-group">
              <button className="btn btn-notice alert-notice" data-toggle="dropdown">
                <i className="fa fa-globe" />
              </button>
              <div id="noticeDropdown" className="dropdown-menu dm-notice pull-right">
                <div role="tabpanel">
                  <NavTabs />
                  <TabPanes />
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="btn-group">
              <button type="button" className="btn btn-logged" data-toggle="dropdown">
                <img src="images/photos/loggeduser.png" alt="" />
                Elen Adarna
                <span className="caret" />
              </button>
              <ul className="dropdown-menu pull-right">
                <li><a href="profile.html"><i className="glyphicon glyphicon-user"></i> My Profile</a></li>
                <li><a href="#"><i className="glyphicon glyphicon-cog"></i> Account Settings</a></li>
                <li><a href="#"><i className="glyphicon glyphicon-question-sign"></i> Help</a></li>
                <li><a href="signin.html"><i className="glyphicon glyphicon-log-out"></i> Log Out</a></li>
              </ul>
            </div>
          </li>
          <li>
            <button id="chatview" className="btn btn-chat alert-notice">
              <span className="badge-alert"></span>
              <i className="fa fa-comments-o"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </React.Fragment >
);
