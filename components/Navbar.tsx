import React from 'react';
import { Search, Bell, Heart, User, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
             <button className="p-2 -ml-2 mr-2 md:hidden text-slate-600">
                <Menu size={24} />
             </button>
             <a href="#" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">F</div>
                <span className="font-serif font-bold text-xl tracking-tight text-slate-900">FASHBY</span>
             </a>
          </div>

          {/* Search Bar - Hidden on mobile, visible on md+ */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Rechercher par nom, catégorie, taille..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-slate-200 focus:bg-white transition-all outline-none text-slate-700 placeholder-slate-400"
              />
              <Search className="absolute left-3.5 top-2.5 text-slate-400" size={18} />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4 text-slate-600">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
               <Heart size={20} />
            </button>
            <button className="flex items-center gap-2 pl-2 hover:bg-gray-100 rounded-full p-1 pr-3 transition-colors">
               <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                 <img src="https://picsum.photos/id/64/100/100" alt="User" className="w-full h-full object-cover" />
               </div>
               <span className="text-xs font-medium hidden lg:block">Mon Compte</span>
            </button>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
              Vendre
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;