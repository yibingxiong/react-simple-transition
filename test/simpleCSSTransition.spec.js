import React from 'react'
import { configure,mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

import SimpleCSSTransition from '../lib/SimpleCSSTransition';

jasmine.addMatchers({
    toExist: () => ({
      compare: actual => ({
        pass: actual != null,
      }),
    }),
  })

describe('SimpleCSSTransition', () => {
    it('show=1时加上入场的css', () => {
        const wrapper = mount(
            <SimpleCSSTransition timeout={10}  show={1} prefix={'prefix'}>
              <div />
            </SimpleCSSTransition>
        )
        .tap(inst => {
    
          expect(inst.getDOMNode().classList.contains('prefix-enter')).toEqual(true);
          expect(inst.getDOMNode().classList.contains('prefix-exit')).toEqual(false)
        })
    });
    it('show=0时加上出场的css', (done) => {
        const wrapper = mount(
            <SimpleCSSTransition timeout={10}  show={1} prefix={'prefix'}>
              <div />
            </SimpleCSSTransition>
        );
        setTimeout(() => {
            wrapper.setProps({
                show: 0,
        
                unload(node){

                  expect(node.className).toEqual('prefix-exit');
                  done();
                }
            });

        }, 10);
    });
});