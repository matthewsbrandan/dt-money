import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento Web',
          amount: 5000.00,
          type: 'deposit',
          category: 'Developer',
          createdAt: new Date('2021-02-26 09:00:00')
        },
        {
          id: 2,
          title: 'Desenvolvimento Web',
          amount: 7000.00,
          type: 'deposit',
          category: 'Developer',
          createdAt: new Date('2021-03-21 10:00:00')
        },
        {
          id: 3,
          title: 'Casa',
          amount: 2500.00,
          type: 'withdraw',
          category: 'House',
          createdAt: new Date('2021-04-10 14:20:00')
        }
      ]
    })
  },

  routes(){
    this.namespace = 'api';
    
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction',data)
    })
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);