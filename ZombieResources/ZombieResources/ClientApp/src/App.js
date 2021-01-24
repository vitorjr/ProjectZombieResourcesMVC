import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchStockResources } from './components/FetchStockResources';
import { AddStockResources } from './components/AddStockResources';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={FetchStockResources} />
        <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/fetch-stockresources' component={FetchStockResources} />
            <Route path='/add-stockresources' component={AddStockResources} />
            <Route path='/stockresources/edit/:id' component={AddStockResources} />
      </Layout>
    );
  }
}
