import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import { CATEGORIES, FEATURED_PRODUCTS, FILTERS, NEW_PRODUCTS } from './constants';
import { SlidersHorizontal, ArrowRight, Sparkles } from 'lucide-react';
import { getStylingAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('1');
  const [aiQuery, setAiQuery] = useState('');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    
    setLoadingAi(true);
    setAiAdvice(null);
    try {
      const advice = await getStylingAdvice(aiQuery);
      setAiAdvice(advice);
    } catch (err) {
      setAiAdvice("Désolé, je n'ai pas pu générer de conseil pour le moment.");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] pb-20">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-white relative overflow-hidden">
           {/* Background decoration */}
           <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-indigo-50/50 to-transparent pointer-events-none"></div>

           <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex-1 space-y-6 max-w-xl">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                    <Sparkles size={12} />
                    <span>Dénichez votre perle rare !</span>
                 </div>
                 <h1 className="text-4xl md:text-5xl font-serif font-medium text-slate-900 leading-tight">
                    Trouvez la pièce parfaite,<br />
                    <span className="text-slate-500">Neuve</span> ou de <span className="text-slate-500">Seconde Main</span>
                 </h1>
                 
                 <div className="bg-white p-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.07)] border border-gray-100 max-w-md">
                   <form onSubmit={handleAiSearch}>
                      <div className="relative">
                         <input 
                           value={aiQuery}
                           onChange={(e) => setAiQuery(e.target.value)}
                           className="w-full pl-4 pr-32 py-3 bg-transparent outline-none text-slate-700 placeholder-slate-400"
                           placeholder="Ex: Tenue pour un mariage..."
                         />
                         <button 
                           type="submit"
                           disabled={loadingAi}
                           className="absolute right-1 top-1 bottom-1 bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-70"
                         >
                            {loadingAi ? '...' : 'Découvrir'}
                            {!loadingAi && <ArrowRight size={14} />}
                         </button>
                      </div>
                   </form>
                   {aiAdvice && (
                     <div className="mt-2 p-3 bg-blue-50 text-blue-800 text-sm rounded-lg border border-blue-100 animate-fadeIn">
                       <p className="flex gap-2">
                         <Sparkles size={16} className="shrink-0 mt-0.5" />
                         {aiAdvice}
                       </p>
                     </div>
                   )}
                 </div>
              </div>

              {/* Hero Image Grid */}
              <div className="flex-1 flex gap-4 h-64 md:h-80 w-full md:w-auto overflow-hidden rounded-2xl">
                 <div className="flex-1 flex flex-col gap-4 -mt-8">
                    <img src="https://picsum.photos/id/338/300/400" className="w-full h-48 object-cover rounded-xl shadow-lg" alt="Fashion" />
                    <img src="https://picsum.photos/id/342/300/400" className="w-full h-48 object-cover rounded-xl shadow-lg" alt="Fashion" />
                 </div>
                 <div className="flex-1 flex flex-col gap-4 mt-4">
                    <img src="https://picsum.photos/id/1027/300/400" className="w-full h-48 object-cover rounded-xl shadow-lg" alt="Fashion" />
                    <div className="relative h-48 rounded-xl shadow-lg overflow-hidden bg-slate-900 text-white p-4 flex flex-col justify-end">
                       <img src="https://picsum.photos/id/646/300/400" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Fashion" />
                       <div className="relative z-10">
                          <p className="text-xs text-gray-300 uppercase mb-1">Homme / Nuit</p>
                          <p className="font-bold text-lg">Hiver 2025</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="sticky top-16 z-40 bg-[#f8f9fc]/95 backdrop-blur py-4 border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat.id 
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                      : 'bg-white text-slate-600 hover:bg-gray-100 border border-transparent hover:border-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
              <div className="h-6 w-px bg-gray-300 mx-2"></div>
              <button className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 px-3">
                 <span>Carté</span>
                 <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
              </button>
           </div>
        </div>
      </div>

      {/* Main Product Section (Mixed) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
         <div className="flex items-center gap-4 mb-6 overflow-x-auto no-scrollbar">
            {FILTERS.map((filter, idx) => (
              <button key={idx} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-lg text-xs text-slate-600 hover:border-gray-300 transition-colors whitespace-nowrap">
                {filter}
                <svg width="8" height="4" viewBox="0 0 8 4" fill="none" className="opacity-50"><path d="M1 1L4 4L7 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            ))}
            <button className="ml-auto px-6 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-lime-600/20 transition-all">
               <SlidersHorizontal size={14} />
               Filtrer
            </button>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map(product => (
               <ProductCard key={product.id} product={product} />
            ))}
         </div>
      </div>

      {/* Dark Section (New Items) */}
      <div className="mt-16 bg-slate-900 py-16 text-white relative overflow-hidden">
         {/* Background accent */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500 rounded-full blur-[120px]"></div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex justify-between items-end mb-8">
               <div>
                  <h2 className="text-3xl font-serif font-medium mb-2">Articles neufs</h2>
                  <div className="flex gap-4 text-sm text-slate-400">
                     <span className="text-white border-b border-white pb-1">Femme</span>
                     <span className="hover:text-white cursor-pointer transition-colors">Homme</span>
                     <span className="hover:text-white cursor-pointer transition-colors">Chaussures</span>
                     <span className="hover:text-white cursor-pointer transition-colors">Sacs</span>
                  </div>
               </div>
               <button className="px-4 py-2 bg-white text-slate-900 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors">
                  Voir tout &gt;
               </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {NEW_PRODUCTS.map(product => (
                  <ProductCard key={product.id} product={product} darkMode={true} />
               ))}
            </div>
         </div>
      </div>

      {/* Second Hand & Premium Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
         <h2 className="text-3xl font-serif font-medium text-slate-900 mb-8">Articles de seconde main</h2>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Premium Banner */}
            <div className="lg:col-span-1 relative rounded-2xl overflow-hidden min-h-[400px] group cursor-pointer">
               <img src="https://picsum.photos/id/192/600/800" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Premium" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
               <div className="absolute bottom-0 left-0 p-8 text-white">
                  <div className="text-amber-300 font-medium text-sm mb-2 tracking-wider flex items-center gap-2">
                     <Sparkles size={14} />
                     Vitrine Premium • Luxe
                  </div>
                  <p className="text-sm text-gray-200 mb-6 leading-relaxed">
                     Parfaite collection, pièces uniques localisées pour vous, certifiées par nos experts.
                  </p>
                  <button className="bg-amber-300 hover:bg-amber-400 text-amber-950 px-6 py-3 rounded-lg text-sm font-bold w-full transition-colors">
                     Consulter la vitrine Luxe &gt;
                  </button>
               </div>
            </div>

            {/* Product Grid next to Banner */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ProductCard product={{
                   id: 'sh1',
                   title: 'Montre Vintage',
                   brand: 'Rolex (Ref)',
                   price: 2050000,
                   currency: 'FCFA',
                   condition: 'BON ETAT',
                   category: 'Accessoires',
                   imageUrl: 'https://picsum.photos/id/175/400/500',
                   isFavorite: false
                }} />
                 <div className="relative rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center group cursor-pointer border border-gray-200 hover:border-gray-300 transition-colors">
                     <img src="https://picsum.photos/id/447/400/500" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" alt="Vendre" />
                     <button className="relative z-10 bg-slate-900 text-white px-8 py-3 rounded-lg font-bold shadow-xl transform group-hover:scale-105 transition-all">
                        + METTRE EN VENTE
                     </button>
                 </div>
            </div>
         </div>
      </div>

      {/* Footer Mock */}
      <footer className="bg-slate-950 text-slate-400 mt-20 pt-16 pb-8 border-t border-slate-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
               <div className="flex items-center gap-2 mb-4 md:mb-0">
                  <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">F</div>
                  <span className="font-serif font-bold text-xl tracking-tight text-white">FASHBY</span>
               </div>
               <div className="flex gap-6 text-sm">
                  <a href="#" className="hover:text-white transition-colors">À propos</a>
                  <a href="#" className="hover:text-white transition-colors">Aide</a>
                  <a href="#" className="hover:text-white transition-colors">Conditions</a>
                  <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
               </div>
            </div>
            <div className="text-center text-xs opacity-50">
               © 2024 Fashby Market. Tous droits réservés.
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;