import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from "miragejs";
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Ganho da Bolsa',
          type: 'deposit',
          category: 'Bolsa',
          amount: 1200,
          createdAt: new Date('2021-05-03 07:00:00'),
        },
        {
          id: 2,
          title: 'Pagamento do aluguel',
          type: 'withdraw',
          category: 'Despesas',
          amount: 400,
          createdAt: new Date('2021-05-10 15:30:00'),
        },
      ]
    })
  },

  routes() {
    this.namespace = "api";

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      data['createdAt'] = new Date();
      
      return schema.create('transaction', data);
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
