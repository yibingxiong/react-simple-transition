import React from 'react';
import SimpleTransition from './SimpleTransition';
import PropTypes from 'prop-types';

class SimpleCSSTransition extends React.PureComponent {
    constructor(props) {
        super(props);
        this.prefix = this.props.prefix || '';
    }
    enter = (node) => {
        if ( typeof this.props.enter === 'function') {
            this.props.enter(node);
        } else {
            node.classList.add(`${this.prefix}-enter`);
        }
    }

    exit = (node) => {
        if ( typeof this.props.exit === 'function') {
            this.props.exit(node);
        } else {
            node.classList.remove(`${this.prefix}-enter`);
            node.classList.add(`${this.prefix}-exit`);
        }
    }
    render() {
        const props = this.props;
        return (
            <SimpleTransition
              enter = {this.enter}
              exit = {this.exit}
              timeout = {props.timeout}
            />
          );
    }
}

SimpleCSSTransition.propTypes = {
    enter: PropTypes.func,  // 自定义入场函数
    exit: PropTypes.func,   // 自定义出场函数
    timeout: PropTypes.number.isRequired    // 出场动画的耗时
}

export default SimpleCSSTransition;