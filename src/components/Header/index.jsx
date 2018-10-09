import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { changeFilter } from '../../core/store/actions/actionsDoList';

class Header extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="header container-flued">
        <div className="row">
          <div className="col-12 alert alert-info">
            {user.phoneNumber
              ? (
                <React.Fragment>
                  <label className="col-11">{`User: ${`${user.firstName} ${user.lastName}`}`}</label>
                  <Link className="btn btn-link col-1" to="/entry" onClick={() => { this.props.remove(); sessionStorage.clear(); }}>Log out</Link>
                </React.Fragment>
              )
              : (
                <React.Fragment>
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${this.props.history.location.pathname === '/registration' ? 'active' : ''}`}
                        to="/registration"
                      >
                        Registration
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${this.props.history.location.pathname === '/entry' ? 'active' : ''}`}
                        to="/entry"
                      >
                        Entry
                      </Link>
                    </li>
                  </ul>
                </React.Fragment>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.toDoListReduser.User,
});

const mapDispatchToProps = dispatch => ({
  remove: () => dispatch(changeFilter()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

Header.propTypes = {
  user: PropTypes.object,
};
