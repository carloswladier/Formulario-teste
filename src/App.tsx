/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ShieldCheck, 
  Headset, 
  Zap, 
  Lock,
  List,
  RefreshCw
} from "lucide-react";
import React, { useState, useEffect } from "react";

export default function App() {
  console.log("App component rendering...");
  const [activeTab, setActiveTab] = useState<"contact" | "data">("contact");
  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const response = await fetch("/api/contact");
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    if (activeTab === "data") {
      fetchContacts();
    }
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", address: "", message: "" });
      } else {
        console.error("Server error:", result);
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary-container blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-300 blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center h-16 px-6 md:px-8 w-full max-w-7xl mx-auto">
          <div className="text-xl font-bold text-primary flex items-center gap-2">
            ProConnect
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a 
              className={`transition-colors font-medium text-sm ${activeTab === 'contact' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`} 
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveTab('contact'); }}
            >
              Contato
            </a>
            <a 
              className={`transition-colors font-medium text-sm ${activeTab === 'data' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`} 
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveTab('data'); }}
            >
              Dados Salvos
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="bg-primary text-on-primary px-6 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center px-4 py-16 md:py-24">
        {activeTab === "contact" ? (
          <>
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-[640px] mb-10 text-center"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-3 tracking-tight">
                Entre em contato
              </h1>
              <p className="text-lg text-on-surface-variant">
                Nossa equipe de especialistas está pronta para ajudar você a escalar seus resultados com soluções personalizadas.
              </p>
            </motion.div>

            {/* Form Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-[640px] bg-surface-container-lowest rounded-2xl p-8 md:p-10 form-shadow border border-outline-variant/30"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-on-surface-variant" htmlFor="name">Nome</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                    <input 
                      className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline/40"
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-on-surface-variant" htmlFor="email">E-mail</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                    <input 
                      className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline/40"
                      id="email"
                      type="email"
                      placeholder="exemplo@proconnect.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-on-surface-variant" htmlFor="phone">Telefone</label>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                      <input 
                        className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline/40"
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Address Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-on-surface-variant" htmlFor="address">Endereço</label>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                      <input 
                        className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline/40"
                        id="address"
                        type="text"
                        placeholder="Cidade, Estado"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-on-surface-variant" htmlFor="message">Mensagem (Opcional)</label>
                  <textarea 
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline/40 resize-none"
                    id="message"
                    rows={4}
                    placeholder="Como podemos ajudar?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary text-on-primary font-semibold py-3.5 rounded-lg shadow-md hover:bg-primary/90 active:scale-[0.99] transition-all flex justify-center items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{status === "loading" ? "Enviando..." : "Enviar"}</span>
                  <Send className={`w-5 h-5 ${status === "loading" ? "" : "group-hover:translate-x-1 group-hover:-translate-y-1"} transition-transform`} />
                </button>

                {status === "success" && (
                  <p className="text-green-600 text-sm text-center font-medium">Sua mensagem foi enviada!</p>
                )}
                {status === "error" && (
                  <p className="text-red-500 text-sm text-center font-medium">Ops! Algo deu errado. Verifique sua conexão.</p>
                )}
              </form>
            </motion.div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-on-surface tracking-tight">Dados Salvos</h1>
                <p className="text-on-surface-variant">Visualize todas as submissões enviadas pelo formulário.</p>
              </div>
              <button 
                onClick={fetchContacts}
                disabled={loadingContacts}
                className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-lg text-sm font-medium hover:bg-surface-container-high transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loadingContacts ? 'animate-spin' : ''}`} />
                Atualizar
              </button>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/30">
                      <th className="px-6 py-4 text-sm font-semibold text-on-surface-variant">ID</th>
                      <th className="px-6 py-4 text-sm font-semibold text-on-surface-variant">Nome</th>
                      <th className="px-6 py-4 text-sm font-semibold text-on-surface-variant">E-mail</th>
                      <th className="px-6 py-4 text-sm font-semibold text-on-surface-variant">Telefone</th>
                      <th className="px-6 py-4 text-sm font-semibold text-on-surface-variant">Mensagem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.length > 0 ? (
                      contacts.map((contact) => (
                        <tr key={contact.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                          <td className="px-6 py-4 text-sm text-on-surface-variant font-mono">#{contact.id}</td>
                          <td className="px-6 py-4 text-sm font-medium text-on-surface">{contact.name}</td>
                          <td className="px-6 py-4 text-sm text-on-surface-variant">{contact.email}</td>
                          <td className="px-6 py-4 text-sm text-on-surface-variant">{contact.phone || "-"}</td>
                          <td className="px-6 py-4 text-sm text-on-surface-variant">
                            <div className="max-w-xs truncate" title={contact.message}>{contact.message || "-"}</div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                          {loadingContacts ? "Carregando..." : "Nenhum dado encontrado."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl"
        >
          <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase">100% Seguro</span>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <Headset className="w-8 h-8 text-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase">Suporte 24/7</span>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <Zap className="w-8 h-8 text-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase">Resposta Rápida</span>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <Lock className="w-8 h-8 text-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase">Privacidade</span>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-200 w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center py-10 px-8 w-full max-w-7xl mx-auto gap-8">
          <div className="font-bold text-gray-900 text-lg">ProConnect</div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <a className="text-gray-500 hover:text-primary transition-colors text-sm underline decoration-transparent hover:decoration-primary underline-offset-4 ring-offset-2" href="#">Privacy Policy</a>
            <a className="text-gray-500 hover:text-primary transition-colors text-sm underline decoration-transparent hover:decoration-primary underline-offset-4 ring-offset-2" href="#">Terms of Service</a>
            <a className="text-gray-500 hover:text-primary transition-colors text-sm underline decoration-transparent hover:decoration-primary underline-offset-4 ring-offset-2" href="#">Help Center</a>
            <a className="text-gray-500 hover:text-primary transition-colors text-sm underline decoration-transparent hover:decoration-primary underline-offset-4 ring-offset-2" href="#">LinkedIn</a>
          </div>
          <div className="text-gray-400 text-xs text-center md:text-right">
            © {new Date().getFullYear()} ProConnect Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
