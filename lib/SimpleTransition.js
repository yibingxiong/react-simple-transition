
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class SimpleTransition extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            status: 1,
        }

    }

    onTransitionEnd = () => {
          setTimeout(() => {
              this.setState({
                  status: 0
              });
          }, this.props.timeout)
      }
    
    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        this.props.enter(this.node);
    }

    render() {
        const { 
            children,
            show,
            exit
        } = this.props;
        const {
            status
        } = this.state;

        // 出场动画执行完了, 卸载dom
        if(!show && status === 0) {
            return null;
        }
        if(!show) {
            if(exit) {
                exit(this.node);
            }
            // 开始动画计时
            this.onTransitionEnd();
        }
        if(show || status === 1) {
            const child = React.Children.only(children);
            return React.cloneElement(child);
        }
        
    }

}

SimpleTransition.propTypes = {
    timeout: PropTypes.number.isRequired,   // 出场动画执行时间
    enter: PropTypes.func.isRequired,       // 进入时执行的函数, 可以在这里加一些入场动画class
    exit: PropTypes.func.isRequired,        // 离开时执行的函数, 可以在这里加一些出场动画class
    show: PropTypes.number.isRequired,      // 挂载or卸载, 1挂载, 0卸载
}
export default SimpleTransition;