"use client";
import React, { useState } from 'react';
import { Plus, Trash2, FileText, Building, User, Calendar, DollarSign } from 'lucide-react';
import { PDFLink } from '../pdf';

export default function InvoiceForm() {
  const [formData, setFormData] = useState({
    // Company Info
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    companyTax: '',

    // Client Info
    clientName: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    clientTax: '',

    // Invoice Details
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',

    // Items
    items: [
      { description: '', quantity: 1, price: 0, tax: 21 }
    ],

    // Additional
    notes: '',
    terms: ''
  });

  const [showPDFButton, setShowPDFButton] = useState(false);

  interface InvoiceItem {
    description: string;
    quantity: number;
    price: number;
    tax: number;
  }

  interface InvoiceFormData {
    // Company Info
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
    companyTax: string;

    // Client Info
    clientName: string;
    clientAddress: string;
    clientPhone: string;
    clientEmail: string;
    clientTax: string;

    // Invoice Details
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;

    // Items
    items: InvoiceItem[];

    // Additional
    notes: string;
    terms: string;
  }

  const handleInputChange = (field: keyof InvoiceFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ): void => {
    const newItems = [...formData.items];
    newItems[index][field] = value as never;
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0, tax: 21 }]
    }));
  };

  const removeItem = (index: number): void => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData((prev: InvoiceFormData) => ({
        ...prev,
        items: newItems
      }));
    }
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const totalTax = formData.items.reduce((sum, item) => sum + ((item.quantity * item.price * item.tax) / 100), 0);
    const total = subtotal + totalTax;

    return { subtotal, totalTax, total };
  };

  // Validation function to check if required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      formData.companyName,
      formData.companyAddress,
      formData.companyTax,
      formData.clientName,
      formData.clientAddress,
      formData.invoiceNumber,
      formData.invoiceDate
    ];

    const hasValidItems = formData.items.every(item => 
      item.description.trim() !== '' && 
      item.quantity > 0 && 
      item.price >= 0
    );

    return requiredFields.every(field => field.trim() !== '') && hasValidItems;
  };

  const handleGeneratePDF = () => {
    if (isFormValid()) {
      setShowPDFButton(true);
    } else {
      alert('Por favor, completa todos los campos obligatorios antes de generar el PDF.');
    }
  };

  const { subtotal, totalTax, total } = calculateTotals();

  return (
    <section id="generador" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Generador de
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Facturas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Completa los datos necesarios y genera tu factura profesional en PDF
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <form className="space-y-8">
              {/* Company Information */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Building className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Información de tu Empresa</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de la Empresa *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Mi Empresa S.L."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CIF/NIF *
                    </label>
                    <input
                      type="text"
                      value={formData.companyTax}
                      onChange={(e) => handleInputChange('companyTax', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="B12345678"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección *
                    </label>
                    <textarea
                      value={formData.companyAddress}
                      onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Calle Principal 123, 28001 Madrid"
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.companyPhone}
                      onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+34 123 456 789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.companyEmail}
                      onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="contacto@miempresa.com"
                    />
                  </div>
                </div>
              </div>

              {/* Client Information */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Información del Cliente</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Cliente *
                    </label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Cliente S.L."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CIF/NIF
                    </label>
                    <input
                      type="text"
                      value={formData.clientTax}
                      onChange={(e) => handleInputChange('clientTax', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="B87654321"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección *
                    </label>
                    <textarea
                      value={formData.clientAddress}
                      onChange={(e) => handleInputChange('clientAddress', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Avenida Cliente 456, 28002 Madrid"
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="+34 987 654 321"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="contacto@empresa.com"
                    />
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Detalles de la Factura</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Factura *
                    </label>
                    <input
                      type="text"
                      value={formData.invoiceNumber}
                      onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="2023/001"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Emisión *
                    </label>
                    <input
                      type="date"
                      value={formData.invoiceDate}
                      onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Vencimiento
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Invoice Items */}
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Artículos de la Factura</h3>
                </div>

                {formData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción *
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Servicio de Consultoría"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cantidad *
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="1"
                        min="1"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio Unitario *
                      </label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="100.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IVA (%) *
                      </label>
                      <input
                        type="number"
                        value={item.tax}
                        onChange={(e) => handleItemChange(index, 'tax', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="21"
                        min="0"
                        max="100"
                        step="1"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-center">
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-800 transition-colors p-2"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mt-4"
                >
                  <Plus className="w-5 h-5" />
                  <span>Añadir Artículo</span>
                </button>
              </div>

              {/* Totals */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <DollarSign className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Totales</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtotal
                    </label>
                    <input
                      type="text"
                      value={`€ ${subtotal.toFixed(2)}`}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IVA Total
                    </label>
                    <input
                      type="text"
                      value={`€ ${totalTax.toFixed(2)}`}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total a Pagar
                    </label>
                    <input
                      type="text"
                      value={`€ ${total.toFixed(2)}`}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-bold text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Notas Adicionales</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notas
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Gracias por su negocio..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Términos y Condiciones
                    </label>
                    <textarea
                      value={formData.terms}
                      onChange={(e) => handleInputChange('terms', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Los pagos deben realizarse dentro de los 30 días..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </form>

            {/* Generate PDF Section */}
            <div className="text-center mt-8 space-y-4">
              {!showPDFButton ? (
                <button
                  type="button"
                  onClick={handleGeneratePDF}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Preparar PDF
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-green-600 font-medium">
                    ✓ Factura validada correctamente
                  </p>
                  <PDFLink {...formData} />
                  <button
                    type="button"
                    onClick={() => setShowPDFButton(false)}
                    className="ml-4 px-6 py-3 bg-gray-500 text-white rounded-full text-sm font-medium hover:bg-gray-600 transition-all duration-300"
                  >
                    Editar Factura
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}