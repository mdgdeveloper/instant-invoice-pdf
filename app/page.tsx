import Header from "@/components/structure/Header";
import Hero from "@/components/structure/Hero";
import CallToAction from "@/components/structure/CallToAction";
import InvoiceForm from "@/components/structure/InvoiceForm";


export default function InvoiceGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <main>
        <Hero />
        <CallToAction />
        <InvoiceForm />
      </main>
    </div>
  );
}