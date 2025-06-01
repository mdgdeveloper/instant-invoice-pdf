"use client";
import React from 'react';
import { CheckCircle, Star, Users, Clock } from 'lucide-react';

export default function CallToAction() {
  const scrollToGenerator = () => {
    const element = document.getElementById('generador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="caracteristicas" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">10K+</div>
            <div className="text-gray-600 text-sm">Usuarios Activos</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">50K+</div>
            <div className="text-gray-600 text-sm">Facturas Creadas</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">4.9</div>
            <div className="text-gray-600 text-sm">Valoración</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">&lt;2min</div>
            <div className="text-gray-600 text-sm">Tiempo Promedio</div>
          </div>
        </div>

        {/* Main CTA Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">
            ¿Por qué elegir
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FacturaPro?
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            La herramienta más confiable y fácil de usar para crear facturas profesionales.
            Únete a miles de profesionales que ya confían en nosotros.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="flex items-center space-x-3 text-left">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Sin registro requerido</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Descarga instantánea en PDF</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Diseño profesional y elegante</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">100% gratuito, sin límites</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Compatible con todos los dispositivos</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">Datos seguros y privados</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToGenerator}
            className="cursor-pointer group px-10 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-full text-xl font-bold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Comenzar Ahora - Es Gratis</span>
              <CheckCircle className="w-6 h-6" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>

          <p className="text-sm text-gray-500 mt-4">
            ✨ No se requiere tarjeta de crédito • Sin compromisos • Comenzar en 30 segundos
          </p>
        </div>
      </div>
    </section>
  );
}