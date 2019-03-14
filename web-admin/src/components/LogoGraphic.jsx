import React from 'react';
import styled from 'styled-components';
import { ReactComponent as DemoBack } from '../assets/back.svg';
import { ReactComponent as DemoFront } from '../assets/front.svg';
import { ReactComponent as DemoTop } from '../assets/top.svg';

const Parallax = styled.div`
  position: absolute;
  width: 400px;
  ${props => `
    svg #stop-1 {
      stop-color: ${props.theme.stop1};
    }
    svg #stop-2 {
      stop-color: ${props.theme.stop2};
    }
    path.graphicAccent {
       fill: ${props.theme.uiAccent};
    }
    path.graphicFont {
      fill: ${props.theme.font};
    }
  `}
`;

class LogoGraphic extends React.Component {
  /** Change this to change the depth of the 3d effect. */
  depth = 1;

  state = {};

  componentDidMount() {
    document.addEventListener('mousemove', this.updatePerspective);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.updatePerspective);
  }

  updatePerspective = event => {
    let { depth } = this.state;

    const perspectiveX = (event.x - window.innerWidth / 2) / (window.innerWidth / 2);
    const perspectiveY = (event.y - window.innerHeight / 2) / (window.innerHeight / 2);
    const angle = Math.abs(Math.sqrt(perspectiveX ** 2 + perspectiveY ** 2)) * 15;
    depth = (depth || 1) + (this.depth - (depth || 1)) / 10;

    this.setState({
      perspectiveX,
      perspectiveY,
      angle,
      depth,
    });
  };

  render() {
    const { perspectiveY, perspectiveX, angle, depth } = this.state;

    const styleBack = {
      transform: `rotate3d(${-perspectiveY},${perspectiveX},0,${angle}deg)`,
    };

    const styleFront = {
      transform: `rotate3d(${-perspectiveY},${perspectiveX},0,${angle}deg) translate3d(0,0,${depth * 15}px)`,
    };

    const styleTop = {
      transform: `rotate3d(${-perspectiveY},${perspectiveX},0,${angle}deg) translate3d(0,0,${depth * 30}px)`,
    };

    return (
      <div style={{ width: '400px', height: '400px', perspective: '1000px' }}>
        <Parallax style={styleBack}>
          <DemoBack />
        </Parallax>
        <Parallax style={styleFront}>
          <DemoFront />
        </Parallax>
        <Parallax style={styleTop}>
          <DemoTop />
        </Parallax>
      </div>
    );
  }
}

export { LogoGraphic };
