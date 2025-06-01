// app/invoice/components/InvoiceForm.tsx
'use client';

import { ChangeEvent } from 'react';

type Item = { description: string; amount: string };

type Props = {
  data: {
    companyName: string;
    clientName: string;
    items: Item[];
    logo: File | null;
  };
  onChange: (updated: Props['data']) => void;
};

export default function InvoiceForm({ data, onChange }: Props) {
  const updateField = (
    field: keyof Props['data'],
    value: string | Item[] | File | null
  ) => {
    onChange({ ...data, [field]: value });
  };

  const updateItem = (index: number, field: keyof Item, value: string) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    updateField('items', newItems);
  };

  const addItem = () => {
    updateField('items', [...data.items, { description: '', amount: '' }]);
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateField('logo', e.target.files[0]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Invoice Info</h2>

      <div>
        <label className="block text-sm font-medium">Company Name</label>
        <input
          type="text"
          className="mt-1 w-full border rounded px-3 py-2"
          value={data.companyName}
          onChange={(e) => updateField('companyName', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Client Name</label>
        <input
          type="text"
          className="mt-1 w-full border rounded px-3 py-2"
          value={data.clientName}
          onChange={(e) => updateField('clientName', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Company Logo</label>
        <input
          type="file"
          accept="image/*"
          className="mt-1 w-full"
          onChange={handleLogoUpload}
        />
        {data.logo && <p className="text-sm mt-1">✅ {data.logo.name}</p>}
      </div>

      <div>
        <h3 className="font-semibold mt-4 mb-2">Invoice Items</h3>
        {data.items.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Description"
              className="w-2/3 border rounded px-2 py-1"
              value={item.description}
              onChange={(e) =>
                updateItem(index, 'description', e.target.value)
              }
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-1/3 border rounded px-2 py-1"
              value={item.amount}
              onChange={(e) => updateItem(index, 'amount', e.target.value)}
            />
          </div>
        ))}
        <button
          onClick={addItem}
          className="text-blue-600 text-sm mt-2 hover:underline"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
}
