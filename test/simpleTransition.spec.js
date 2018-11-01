import React from 'react'
import { configure,mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

import SimpleTransition from '../lib/SimpleTransition';

jasmine.addMatchers({
    toExist: () => ({
      compare: actual => ({
        pass: actual != null,
      }),
    }),
  })

describe('SimpleTransition', () => {
    it('当show为1时enter方法需要被执行一次,exit方法不能被执行', () => {
        const onEnter = sinon.spy()
        const onExit = sinon.spy()
        const wrapper = mount(
            <SimpleTransition timeout={10} enter={onEnter} exit = {onExit} show={1}>
              <div />
            </SimpleTransition>
        );
        expect(onEnter.calledOnce).toEqual(true);
        expect(onExit.calledOnce).toEqual(false)
    });
    it('当show为0时exit方法需要被执行一次, dom最终被卸载的时间在timeout的10毫秒误差内', (done) => {
        let onEnter = sinon.spy();
        let exitCalled = 0;
        const timeout = 100;
        let st = 0;
        let onExit = () => {
            exitCalled++;
            expect(exitCalled).toBe(1); // exit只能被调用一次
            st = Date.now();
        };

        let unload = () => {
            let now = Date.now();
            console.log('从执行exit到真正卸载的时间', now - st);
            expect(now - st).toBeLessThan(timeout + 10);
            expect(now - st).not.toBeLessThan(timeout);
            done();
        }
        const wrapper = mount(
            <SimpleTransition timeout={timeout} enter={onEnter} exit = {onExit} show={0} unload = {unload}>
              <div />
            </SimpleTransition>
        );
    });
});