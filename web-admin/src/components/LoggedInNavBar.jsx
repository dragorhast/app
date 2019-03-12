import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HamburgerButton } from 'react-hamburger-button';
import Media from 'react-media';
import { PHONE_BREAK_POINT } from '../styles/constants';
import COLORS from '../styles/styledComponentTheme';
import withSignOut from '../shared/redux/containers/LoginAndOutContainer';

// ****** NAV BAR ON LAPTOP ****** //
const STabBarFullScreen = styled.div`
  position: sticky;
  top: 0; /* Distance from top to stick to*/
  background-color: white; // TODO change to primary
  display: flex;
  overflow: scroll; // TODO change to burger
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 64px !important;
  border-bottom: 1px solid grey;
  a {
    text-decoration: none;
    color: grey;
    flex: 1;
    height: 100%;

    :hover {
      cursor: pointer;
    }
  }
`;

const SNavSelection = styled.div`
  flex: 1;
  padding: 16px 8px;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%
    ${props =>
      props.selected &&
      `
  color: ${props.theme.primary};
  border-bottom: 2px solid ${props.theme.primary};
`};
`;

// ***** NAV BAR ON PHONE ****** //
const SNavBarPhoneScreen = styled.div`
  position: sticky;
  top: 0; /* Distance from top to stick to*/
  z-index: 70;
  background-color: white; // TODO change to primary
  display: flex;
  overflow: scroll; // TODO change to burger
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 48px !important;
  border-bottom: 1px solid grey;
  padding: 8px 16px;
`;

const SOverlay = styled.div`
  @keyframes backgroundOpacityChange {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  display: ${props => (props.open ? 'block' : 'none')};

  position: absolute;
  top: 0;
  z-index: 10;

  width: 100vw;
  height: 100vh;
  // black 50% opacity
  background-color: hsla(0, 0%, 0%, 0.5);
`;

const SDropDownMenu = styled.div`
  @keyframes leftToRight {
    from {
      left: -240px;
    }
    to {
      left: 0;
    }
  }
  // only starts when display is !none
  animation: leftToRight 2s;

  display: ${props => (props.open ? 'flex' : 'none')};

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  position: absolute;
  top: 48px;
  left: 0;
  z-index: 69;

  width: 196px;
  height: 80vh;
  padding: 16px;

  background-color: white;

  a {
    text-decoration: none;
    font-size: 24px;
    color: black;
  }
`;

class LoggedInNavBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      navBarOpen: false,
    };
    this.handleBurgerClick = this.handleBurgerClick.bind(this);
  }

  initiateLogOut = async () => {
    const { logout, history } = this.props;
    try {
      await logout();
      history.replace('/login');
    } catch (e) {
      // Do nothing if error
      console.log(e);
      return Promise.resolve();
    }
  };

  handleBurgerClick = () => {
    this.setState(prevState => ({
      navBarOpen: !prevState.navBarOpen,
    }));
  };

  render() {
    const { location } = this.props;
    const { navBarOpen } = this.state;
    return (
      <Media query={{ minWidth: PHONE_BREAK_POINT }}>
        {bigScreen =>
          bigScreen ? (
            <STabBarFullScreen>
              <SNavSelection style={{ minWidth: '80px' }}>Tap 2 Go</SNavSelection>
              {/* TODO remove code duplications */}
              <Link to="/bikes">
                <SNavSelection selected={location.pathname.match(/\/bikes/g)}>Bike</SNavSelection>
              </Link>
              <Link to="/pickups">
                <SNavSelection selected={location.pathname.match(/\/pickup/g)}>Pickup Points</SNavSelection>
              </Link>
              <Link to="/issues">
                <SNavSelection selected={location.pathname.match(/\/issue/g)}>Issues</SNavSelection>
              </Link>
              <Link to="/reservations">
                <SNavSelection selected={location.pathname.match(/\/reservations/g)}>Reservations</SNavSelection>
              </Link>
              <Link to="/reports">
                <SNavSelection selected={location.pathname.match(/\/reports/g)}>Reports</SNavSelection>
              </Link>

              <a to="#">
                <SNavSelection onClick={this.initiateLogOut} styl={{ justifySelf: 'flex-end' }}>
                  Sign Out
                </SNavSelection>
              </a>
            </STabBarFullScreen>
          ) : (
            <div>
              <SNavBarPhoneScreen>
                <HamburgerButton
                  open={navBarOpen}
                  onClick={this.handleBurgerClick}
                  width={32}
                  height={24}
                  strokeWidth={4}
                  color={COLORS.primary}
                  animationDuration={0.5}
                />
              </SNavBarPhoneScreen>
              <SOverlay open={navBarOpen} />
              <SDropDownMenu open={navBarOpen}>
                <Link to="/bikes">
                  <SNavSelection selected={location.pathname.match(/\/bikes/g)}>Bikes</SNavSelection>
                </Link>
                <Link to="/pickups">
                  <SNavSelection selected={location.pathname.match(/\/pickup/g)}>Pickup Points</SNavSelection>
                </Link>
                <Link to="/issues">
                  <SNavSelection selected={location.pathname.match(/\/issue/g)}>Issues</SNavSelection>
                </Link>
                <Link to="/reservations">
                  <SNavSelection selected={location.pathname.match(/\/reservations/g)}>Reservations</SNavSelection>
                </Link>
                <Link to="/reports">
                  <SNavSelection selected={location.pathname.match(/\/reports/g)}>Reports</SNavSelection>
                </Link>
              </SDropDownMenu>
            </div>
          )
        }
      </Media>
    );
  }
}

LoggedInNavBar.propTypes = {
  /* Passed in from <Route> */
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withSignOut(LoggedInNavBar);
