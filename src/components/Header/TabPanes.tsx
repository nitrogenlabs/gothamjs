import * as React from 'react';

import {TabPanesProps} from '../../types/components/header';

export class TabPanes extends React.Component<TabPanesProps> {
  readonly name: string;

  constructor(props: TabPanesProps) {
    super(props, 'tabPanes');
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <div className="tab-content">
          <div role="tabpanel" className="tab-pane active" id="notification">
            <ul className="list-group notice-list">
              <li className="list-group-item unread">
                <div className="row">
                  <div className="col-xs-2">
                    <i className="fa fa-envelope" />
                  </div>
                  <div className="col-xs-10">
                    <h5><a href="">New message from Weno Carasbong</a></h5>
                    <small>June 20, 2015</small>
                    <span>Soluta nobis est eligendi optio cumque...</span>
                  </div>
                </div>
              </li>
              <li className="list-group-item unread">
                <div className="row">
                  <div className="col-xs-2">
                    <i className="fa fa-user" />
                  </div>
                  <div className="col-xs-10">
                    <h5><a href="">Renov Leonga is now following you!</a></h5>
                    <small>June 18, 2015</small>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2">
                    <i className="fa fa-user" />
                  </div>
                  <div className="col-xs-10">
                    <h5><a href="">Zaham Sindil is now following you!</a></h5>
                    <small>June 17, 2015</small>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2">
                    <i className="fa fa-thumbs-up" />
                  </div>
                  <div className="col-xs-10">
                    <h5><a href="">Rey Reslaba likes your post!</a></h5>
                    <small>June 16, 2015</small>
                    <span>HTML5 For Beginners Chapter 1</span>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2">
                    <i className="fa fa-comment" />
                  </div>
                  <div className="col-xs-10">
                    <h5><a href="">Socrates commented on your post!</a></h5>
                    <small>June 16, 2015</small>
                    <span>Temporibus autem et aut officiis debitis...</span>
                  </div>
                </div>
              </li>
            </ul>
            <a className="btn-more" href="">View More Notifications <i className="fa fa-long-arrow-right" /></a>
          </div>

          <div role="tabpanel" className="tab-pane" id="reminders">
            <h1 id="todayDay" className="today-day">...</h1>
            <h3 id="todayDate" className="today-date">...</h3>

            <h5 className="today-weather"><i className="wi wi-hail"></i> Cloudy 77 Degree</h5>
            <p>Thunderstorm in the area this afternoon through this evening</p>

            <h4 className="panel-title">Upcoming Events</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2">
                    <h4>20</h4>
                    <p>Aug</p>
                  </div>
                  <div className="col-xs-10">
                    <h5><a href="">HTML5/CSS3 Live! United States</a></h5>
                    <small>San Francisco, CA</small>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2">
                    <h4>05</h4>
                    <p>Sep</p>
                  </div>
                  <div className="col-xs-10">
                    <h5><a href="">Web Technology Summit</a></h5>
                    <small>Sydney, Australia</small>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2">
                    <h4>25</h4>
                    <p>Sep</p>
                  </div>
                  <div className="col-xs-10">
                    <h5><a href="">HTML5 Developer Conference 2015</a></h5>
                    <small>Los Angeles CA United States</small>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2">
                    <h4>10</h4>
                    <p>Oct</p>
                  </div>
                  <div className="col-xs-10">
                    <h5><a href="">AngularJS Conference 2015</a></h5>
                    <small>Silicon Valley CA, United States</small>
                  </div>
                </div>
              </li>
            </ul>
            <a className="btn-more" href="">View More Events <i className="fa fa-long-arrow-right"></i></a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
