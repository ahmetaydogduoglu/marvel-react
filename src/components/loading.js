import React from 'react'
import PropTypes from 'prop-types';

const loading = ({ message }) => <h3>{message}Loading...</h3>;

loading.propTypes = {
    message: PropTypes.string.isRequired
}

export default loading



