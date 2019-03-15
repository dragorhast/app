import * as React from 'react';
import qrcode from 'qrcode';
import * as PropTypes from 'prop-types';
import printJS from 'print-js';

export class QRCode extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  QRSettings = {
    errorCorrectionLevel: 'H',
  };

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    const { text } = this.props;
    qrcode.toCanvas(this.canvas.current, text, this.QRSettings);
  }

  print = async () => {
    const { text } = this.props;
    const url = await qrcode.toDataURL(text, this.QRSettings);
    printJS(url, 'image');
  };

  render() {
    return <canvas ref={this.canvas} />;
  }
}
