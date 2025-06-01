// app/invoice/components/PreviewPane.tsx
'use client';

type Props = {
  data: {
    companyName: string;
    clientName: string;
    items: { description: string; amount: string }[];
    logo: File | null;
  };
};

export default function PreviewPane({ data }: Props) {
  const total = data.items.reduce(
    (acc, item) => acc + parseFloat(item.amount || '0'),
    0
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Invoice Preview</h2>
      {data.logo && (
        <img
          src={URL.createObjectURL(data.logo)}
          alt="Company Logo"
          className="h-16 mb-4 object-contain"
        />
      )}
      <div className="space-y-2">
        <p>
          <strong>From:</strong> {data.companyName || '—'}
        </p>
        <p>
          <strong>To:</strong> {data.clientName || '—'}
        </p>
        <div className="mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">Description</th>
                <th className="text-right py-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-1">{item.description}</td>
                  <td className="text-right py-1">
                    {parseFloat(item.amount || '0').toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="font-bold pt-2">Total</td>
                <td className="font-bold text-right pt-2">{total.toFixed(2)} €</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
