// Type Predicates

import React from "react";

export type FinalInvoice ={
  __typename: 'FinalInvoice';
  id: number;
  amount: number;
  approvedBy: string;
  status: 'final';
}

export type  DraftInvoice = {
  __typename: 'DraftInvoice';
  id: number;
  amount?: number;
  approvedBy?: string;
  status: 'draft';
}

export type Invoice = FinalInvoice | DraftInvoice;

export const isFinalInvoice = (invoice: Invoice): invoice is FinalInvoice => {
  return invoice.__typename === 'FinalInvoice';
}

export const isDraftInvoice = (invoice: Invoice): invoice is DraftInvoice => {
  return invoice.__typename === 'DraftInvoice';
}

// mock some invoices data

const draftInvoice: Invoice = {
  __typename: 'DraftInvoice',
  id: 1,
  amount: 100,
  approvedBy: 'John Doe',
  status: 'draft',
}

const finalInvoice: Invoice = {
  __typename: 'FinalInvoice',
  id: 1,
  amount: 100,
  approvedBy: 'John Doe',
  status: 'final',
}

isDraftInvoice(draftInvoice); // will return true ✅
isDraftInvoice(finalInvoice); // will return false ❌

isFinalInvoice(draftInvoice); // will return false ❌
isFinalInvoice(finalInvoice); // will return true ✅

const sendEmail = (invoice: FinalInvoice | DraftInvoice) => {
  // ...
};

const InvoiceMailer = () => {
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | undefined>(undefined);

  // some state management logic
  return (
    <div>
      {selectedInvoice && isFinalInvoice(selectedInvoice) && <button onClick={() => sendEmail(selectedInvoice)}>Send Final Invoice</button>}
      {selectedInvoice && isDraftInvoice(selectedInvoice) && <button onClick={() => sendEmail(selectedInvoice)}>Send Draft Invoice</button>}
    </div>
  );
}
