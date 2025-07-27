import { Request, Response } from 'express';
import * as invoiceService from './invoice.service';

export function createInvoice(req: Request, res: Response) {
  const data = req.body;
  if (!data.clientId || !data.items || !data.dueDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const total = data.items.reduce((sum: number, item: any) => sum + item.amount, 0);

  const invoice = invoiceService.createInvoice({
    ...data,
    total,
  });

  res.status(201).json(invoice);
}

export function getInvoices(req: Request, res: Response) {
  const invoices = invoiceService.getInvoices();
  res.json(invoices);
}

export function getInvoiceById(req: Request, res: Response) {
  const invoice = invoiceService.getInvoiceById(req.params.id);
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
  res.json(invoice);
}

export function updateInvoice(req: Request, res: Response) {
  const invoice = invoiceService.updateInvoice(req.params.id, req.body);
  if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
  res.json(invoice);
}

export function deleteInvoice(req: Request, res: Response) {
  const deleted = invoiceService.deleteInvoice(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Invoice not found' });
  res.status(204).send();
}


