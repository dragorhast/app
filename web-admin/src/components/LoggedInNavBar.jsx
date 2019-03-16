import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HamburgerButton } from 'react-hamburger-button';
import Media from 'react-media';
import { PHONE_BREAK_POINT } from '../styles/constants';
import COLORS from '../styles/styledComponentTheme';
import withSignOut from '../shared/redux/containers/LoginAndOutContainer';
import { Logo } from '../styles/components/Common';

// ****** NAV BAR ON LAPTOP ****** //
const STabBarFullScreen = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.2);
  z-index: 10;
  a {
    flex: 1;
    text-decoration: none;
    color: inherit;
  }
  ${props => `color: ${props.theme.font}`};
`;

const NavElement = styled.div`
  box-sizing: border-box;
  padding: 1.2em 0;
  height: 100%;
  text-align: center;
  ${props =>
    props.selected &&
    `
  font-weight: bold;
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
  static propTypes = {
    /* Passed in from <Route> */
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      navBarOpen: false,
    };
    this.handleBurgerClick = this.handleBurgerClick.bind(this);
  }

  initiateLogOut = async () => {
    const { logout } = this.props;
    try {
      await logout();
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
              <Link to="/">
                <NavElement selected={location.pathname.match(/\/$/g)}>
                  <Logo />
                  &nbsp;Dashboard
                </NavElement>
              </Link>
              {/* TODO remove code duplications */}
              <Link to="/bikes">
                <NavElement selected={location.pathname.match(/\/bikes/g)}>Bikes</NavElement>
              </Link>
              <Link to="/pickups">
                <NavElement selected={location.pathname.match(/\/pickup/g)}>Pickup Points</NavElement>
              </Link>
              <Link to="/issues">
                <NavElement selected={location.pathname.match(/\/issue/g)}>Issues</NavElement>
              </Link>
              <Link to="/reservations">
                <NavElement selected={location.pathname.match(/\/reservations/g)}>Reservations</NavElement>
              </Link>
              <Link to="/reports">
                <NavElement selected={location.pathname.match(/\/reports/g)}>Reports</NavElement>
              </Link>
              <Link to="#">
                <NavElement onClick={this.initiateLogOut}>Sign Out</NavElement>
              </Link>
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
                  <NavElement selected={location.pathname.match(/\/bikes/g)}>Bikes</NavElement>
                </Link>
                <Link to="/pickups">
                  <NavElement selected={location.pathname.match(/\/pickup/g)}>Pickup Points</NavElement>
                </Link>
                <Link to="/issues">
                  <NavElement selected={location.pathname.match(/\/issue/g)}>Issues</NavElement>
                </Link>
                <Link to="/reservations">
                  <NavElement selected={location.pathname.match(/\/reservations/g)}>Reservations</NavElement>
                </Link>
                <Link to="/reports">
                  <NavElement selected={location.pathname.match(/\/reports/g)}>Reports</NavElement>
                </Link>
                <Link to="#">
                  <NavElement onClick={this.initiateLogOut}>Sign Out</NavElement>
                </Link>
              </SDropDownMenu>
            </div>
          )
        }
      </Media>
    );
  }
}

export default withSignOut(LoggedInNavBar);
