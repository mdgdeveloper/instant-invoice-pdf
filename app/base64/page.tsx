'use client';

import { useState } from 'react';

export default function ImageToBase64() {
  const [base64, setBase64] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setBase64(result);
      setPreview(result);
    };
    reader.readAsDataURL(file); // Converts to base64
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Image to Base64 Converter</h1>
      <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />

      {preview && (
        <div className="mt-4">
          <h2 className="font-semibold">Preview:</h2>
          <img src={preview} alt="Preview" className="mt-2 max-w-full h-auto" />
        </div>
      )}

      {base64 && (
        <div className="mt-4">
          <h2 className="font-semibold">Base64:</h2>
          <textarea
            readOnly
            value={base64}
            rows={6}
            className="w-full mt-2 p-2 border rounded bg-gray-100 text-sm"
          />
        </div>
      )}
    </div>
  );
}
