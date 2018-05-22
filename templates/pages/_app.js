import React from 'react';
import {Provider} from 'react-redux';
import App, {Container} from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../utils/store';

class MyApp extends App {

    static async getInitialProps({Component, ctx}) {
        const props = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return {props};
    }

    render() {
        const {Component, props, store} = this.props;

        return(
            <Container>
            <Provider store={store}>
            <Component {...props} />
    </Provider>
        </Container>
    )
    }
}

export default withRedux(initStore)(MyApp);