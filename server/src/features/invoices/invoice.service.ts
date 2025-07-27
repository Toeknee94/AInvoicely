import { Invoice } from './invoice.model';
import { v4 as uuidv4 } from 'uuid';

let invoices: Invoice[] = [];

export function createInvoice(data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Invoice {
  const newInvoice: Invoice = {
    ...data,
    id: uuidv4(),
    status: 'unpaid',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  invoices.push(newInvoice);
  return newInvoice;
}

export function getInvoices(): Invoice[] {
  return invoices;
}

export function getInvoiceById(id: string): Invoice | undefined {
  return invoices.find(inv => inv.id === id);
}

export function updateInvoice(id: string, updates: Partial<Invoice>): Invoice | undefined {
  const index = invoices.findIndex(inv => inv.id === id);
  if (index === -1) return undefined;

  invoices[index] = {
    ...invoices[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return invoices[index];
}

export function deleteInvoice(id: string): boolean {
  const index = invoices.findIndex(inv => inv.id === id);
  if (index === -1) return false;
  invoices.splice(index, 1);
  return true;
}
