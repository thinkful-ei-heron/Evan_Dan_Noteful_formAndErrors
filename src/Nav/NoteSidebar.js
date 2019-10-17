import React from 'react';
import PropTypes from 'prop-types';

export default function NoteSidebar(props) {
  return (
    <nav>
      <button className="goBackBtn" onClick={props.goBackEvent}>
        Go Back
      </button>
    </nav>
  );
}

NoteSidebar.propTypes = {
  goBackEvent: PropTypes.func
};
