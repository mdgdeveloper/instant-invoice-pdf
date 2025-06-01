// app/invoice/page.tsx
'use client';

import { useState } from 'react';
import InvoiceForm from '@/components/invoice/InvoiceForm';
import PreviewPane from '@/components/invoice/PreviewPane';
import { generateInvoicePdf } from '@/lib/pdf';

export default function InvoicePage() {
  const [formData, setFormData] = useState({
    companyName: '',
    clientName: '',
    items: [{ description: '', amount: '' }],
    logo: null as File | null,
  });

  const handleDownload = async () => {
    const blob = await generateInvoicePdf(formData);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'invoice.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold">Instant Invoice Generator</h1>
          <p className="text-gray-600 mt-2">
            Create and download professional invoices as PDFs in seconds.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InvoiceForm data={formData} onChange={setFormData} />
          <PreviewPane data={formData} />
        </section>

        <div className="text-center">
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Download PDF
          </button>
        </div>
      </div>
    </main>
  );
}
