import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface InvoiceInput {
  clientName: string;
  workDescription: string;
  amount: string;
  dueDate: string;
}

export const generateInvoiceWithAI = async ({
  clientName,
  workDescription,
  amount,
  dueDate,
}: InvoiceInput): Promise<string> => {
  const prompt = `
Create a professional invoice summary with the following details:
- Client: ${clientName}
- Work: ${workDescription}
- Amount: £${amount}
- Due Date: ${dueDate}

Keep it short, clear, and ready to paste into a PDF or email.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content || '';
};
