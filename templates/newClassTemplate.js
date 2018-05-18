module.exports = options => (
`import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ${options.name} extends Component
{
    constructor()
    {
        super(props)
    }
    render() {
        return(
            <div>
            </div>
        );
    }
}

${options.name}.propTypes = {
};

${options.name}.defaultProps = {
};

export default ${options.name};
`
);