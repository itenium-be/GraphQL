import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import { AppWithLayout } from './AppWithLayout';
import { App } from './App.jsx';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/invoices/create" element={<AppWithLayout Component={EditInvoice} />} />
        <Route path="/invoices/:id" element={<AppWithLayout Component={EditInvoice} />} />
        <Route path="/invoices" element={<AppWithLayout Component={InvoiceList} />} /> */}
        <Route path="/" element={<AppWithLayout Component={App} />} />
      </Switch>
    </BrowserRouter>
  );
};
