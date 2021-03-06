import React from 'react';
import SimpleTransition from './SimpleTransition';
import PropTypes from 'prop-types';

class SimpleCSSTransition extends React.PureComponent {
    constructor(props) {
        super(props);
        this.prefix = this.props.prefix || '';
        this.enter = this.enter.bind(this);
        this.exit = this.exit.bind(this);
    }
    enter(node) {
        if ( typeof this.props.enter === 'function') {
            this.props.enter(node);
        } else {
            node.classList.add(`${this.prefix}-enter`);
        }
    }

    exit(node) {
        if ( typeof this.props.exit === 'function') {
            this.props.exit(node);
        } else {
            node && node.classList.remove(`${this.prefix}-enter`);
            node && node.classList.add(`${this.prefix}-exit`);
        }
    }
    render() {
        const {
            timeout,
            show,
            children,
            unload = () => {},
        } = this.props;
        const child = React.Children.only(children);
        return (
            <SimpleTransition
              enter = {this.enter}
              exit = {this.exit}
              timeout = {timeout}
              show = {show}
              unload = {unload}
            >
            {child}
            </SimpleTransition>
          );
    }
}

SimpleCSSTransition.propTypes = {
    enter: PropTypes.func,  // 自定义入场函数
    exit: PropTypes.func,   // 自定义出场函数
    timeout: PropTypes.number.isRequired,    // 出场动画的耗时
    show: PropTypes.number.isRequired,       // 显示或隐藏
    prefix: PropTypes.string,               // css class前缀
}

export default SimpleCSSTransition;