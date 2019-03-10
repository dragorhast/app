import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const SArrowsAndLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
`;

const SArrows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 8px;
`;

const SArrow = styled.span`
  color: ${props => props.theme.primary}; // TODO set to primary - theme
  :hover {
    cursor: pointer;
  }
`;

const ControlArrows = ({ label, onUpPress, onDownPress }) => (
  <SArrowsAndLabel>
    {label}
    <SArrows>
      <SArrow>
        <FontAwesomeIcon icon={faCaretUp} onClick={onUpPress} size="1x" />
      </SArrow>
      <SArrow>
        <FontAwesomeIcon icon={faCaretDown} onClick={onDownPress} size="1x" />
      </SArrow>
    </SArrows>
  </SArrowsAndLabel>
);

ControlArrows.propTypes = {
  label: PropTypes.string.isRequired,
  onUpPress: PropTypes.func.isRequired,
  onDownPress: PropTypes.func.isRequired,
};

export default ControlArrows;
