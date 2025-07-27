import { Request, Response } from 'express';
import { generateInvoiceWithAI } from './ai.service';

export const generateAIInvoice = async (req: Request, res: Response) => {
  const { clientName, workDescription, amount, dueDate } = req.body;

  if (!clientName || !workDescription || !amount || !dueDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const invoice = await generateInvoiceWithAI({
      clientName,
      workDescription,
      amount,
      dueDate,
    });

    return res.status(200).json({ invoice });
  } catch (error) {
    console.error('AI Error:', error);
    return res.status(500).json({ message: 'AI generation failed' });
  }
};
