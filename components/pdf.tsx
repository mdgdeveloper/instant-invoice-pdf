// components/pdf.tsx
'use client';
import dynamic from "next/dynamic";
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';


// const [formData, setFormData] = useState({
//   // Company Info
//   companyName: '',
//   companyAddress: '',
//   companyPhone: '',
//   companyEmail: '',
//   companyTax: '',

//   // Client Info
//   clientName: '',
//   clientAddress: '',
//   clientPhone: '',
//   clientEmail: '',
//   clientTax: '',

//   // Invoice Details
//   invoiceNumber: '',
//   invoiceDate: new Date().toISOString().split('T')[0],
//   dueDate: '',

//   // Items
//   items: [
//     { description: '', quantity: 1, price: 0, tax: 21 }
//   ],

//   // Additional
//   notes: '',
//   terms: ''
// });


interface Props {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyTax: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  clientTax: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: Array<{
    description: string;
    quantity: number;
    price: number;
    tax: number;
  }>;
  notes?: string;
  terms?: string;
  logo?: string; // Base64 encoded image
}




const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const CalculateTotalWithTax = (items: Array<{ price: number; quantity: number; tax: number }>) => {
  return items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    const taxAmount = (item.tax / 100) * itemTotal;
    return total + itemTotal + taxAmount;
  }, 0);
}



// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 80,
    objectFit: 'contain',
    marginBottom: 20,
  },
  companyInfo: {
    justifyContent: 'center',
  },
  invoiceInfo: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 20,
  },
  addressBlock: {
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    padding: 8,
    borderTop: '1 solid #ccc',
    borderBottom: '1 solid #ccc',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: '1 solid #eee',
  },
  colDescription: { width: '50%' },
  colQty: { width: '15%', textAlign: 'right' },
  colPrice: { width: '15%', textAlign: 'right' },
  colTotal: { width: '20%', textAlign: 'right' },
  totalSection: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
});

// PDF Document
const MyPDFDocument = (data: Props) => {
  // const total = calculateTotal(invoice.items);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {data.logo && <Image src={data.logo} style={styles.logo} />}
          <View style={styles.companyInfo}>
            <Text>{data.companyName}</Text>
            <Text>{data.companyAddress}</Text>
            <Text>{data.companyPhone}</Text>
            <Text>{data.companyEmail}</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.label}>Factura</Text>
            <Text>Numero: {data.invoiceNumber}</Text>
            <Text>Fecha: {data.invoiceDate}</Text>
            {data.dueDate !== "" && <Text>Vencimiento: {data.dueDate}</Text>}
          </View>
        </View>

        {/* Recipient */}
        <View style={styles.section}>
          <Text style={styles.label}>Cliente:</Text>
          <Text>{data.clientName}</Text>
          <Text>{data.clientAddress}</Text>
          <Text>{data.clientPhone}</Text>
          <Text>{data.clientEmail}</Text>

        </View>

        {/* Items Table */}
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.colDescription}>Descripcion</Text>
            <Text style={styles.colQty}>Cantidad</Text>
            <Text style={styles.colPrice}>Precio</Text>
            <Text style={styles.colTotal}>IVA</Text>
            <Text style={styles.colTotal}>Total</Text>
          </View>

          {data.items && data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>${item.price.toFixed(2)}</Text>
              <Text style={styles.colTotal}>{item.tax}%</Text>
              <Text style={styles.colTotal}>
                ${(item.price * item.quantity * (1 + item.tax / 100)).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Total */}
        {data.items && <View style={styles.totalSection}>
          <Text style={styles.totalText}>Total: ${CalculateTotalWithTax(data.items).toFixed(2)}</Text>
        </View>}
      </Page>
    </Document>
  );
};

// PDF Download Link
export const PDFLink = (props: Props) => (

  <PDFDownloadLink document={<MyPDFDocument {...props} />} fileName="invoice.pdf">
    {({ loading }) =>
      loading ? 'Generating PDF...' : (
        <button className="cursor-pointer p-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition px-3">
          Descargar Factura en PDF
        </button>
      )
    }
  </PDFDownloadLink>
);

export default MyPDFDocument;
