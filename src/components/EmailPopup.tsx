import { useState } from 'react';
import { Check, X, ArrowRight, Mail } from 'lucide-react';

interface EmailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  auction: {
    auctionLink: string;
    title: string;
  };
}

const EmailPopup: React.FC<EmailPopupProps> = ({ isOpen, onClose, auction }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSuccess(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to auction link
    if (auction.auctionLink) {
      window.location.href = auction.auctionLink;
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => !isSubmitting && onClose()}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-purple-100 rounded-full blur-3xl opacity-30" />
        
        {/* Close Button */}
        {!isSubmitting && (
          <button 
            onClick={() => onClose()}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
          >
            <X size={20} />
          </button>
        )}

        <div className="relative p-6">
          {!isSuccess ? (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Almost there!
                </h3>
                <p className="text-gray-600">
                  Enter your email to place your bid and receive auction updates
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             placeholder:text-gray-400 text-black transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-xl font-medium 
                           relative overflow-hidden
                           transition-all duration-300 
                           hover:shadow-lg hover:scale-[1.02]
                           group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-800 to-blue-600
                                opacity-0 group-hover/btn:opacity-60
                                bg-[length:200%_100%]
                                group-hover/btn:animate-smoothFlow
                                transition-opacity duration-150" 
                  />
                  <div className="relative flex items-center justify-center gap-2 text-white">
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Continue to Bid
                        <ArrowRight size={18} />
                      </>
                    )}
                  </div>
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-500 mb-4">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Email Confirmed!
              </h3>
              <p className="text-gray-600">
                Redirecting you to the auction...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;