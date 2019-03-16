import * as React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { QRCode } from './QRCode';

const Ident = styled.pre`
  font-family: 'IBM Plex Mono', monospace;
  font-weight: bold;
  margin: 0;
  display: inline-block;
`;

export class BikeIdentifier extends React.PureComponent {
  static propTypes = {
    identifier: PropTypes.string.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
    this.qr = React.createRef();
  }

  printQR = async () => {
    this.qr.current.print();
  };

  render() {
    const { identifier, style } = this.props;

    return (
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', ...style }}>
        <QRCode ref={this.qr} text={identifier} />
        <div style={{ textAlign: 'center' }}>
          <Ident>{identifier}</Ident> •&nbsp;
          <a style={{ cursor: 'pointer' }} onClick={this.printQR}>
            Print
          </a>
        </div>
      </div>
    );
  }
}
