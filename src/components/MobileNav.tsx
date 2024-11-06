import { useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`
        md:hidden absolute top-full left-0 right-0 
        bg-white backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
        border-t border-gray-50
        transition-all duration-300 px-4
        ${isOpen ? 'opacity-100 translate-y-0 rounded-b-lg' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}
    >
      <div className="max-w-lg mx-auto">
        <nav className="py-4">
          <ul className="space-y-2">
            <li>
              <a 
                href="/about" 
                className="block px-6 py-3.5 rounded-xl text-gray-600 
                         hover:bg-gray-50/80 hover:text-gray-900
                         transition-colors text-lg font-medium"
                onClick={onClose}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="/blog" 
                className="block px-6 py-3.5 rounded-xl text-gray-600 
                         hover:bg-gray-50/80 hover:text-gray-900
                         transition-colors text-lg font-medium"
                onClick={onClose}
              >
                Blog
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className="block px-6 py-3.5 rounded-xl text-gray-600 
                         hover:bg-gray-50/80 hover:text-gray-900
                         transition-colors text-lg font-medium"
                onClick={onClose}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav; 