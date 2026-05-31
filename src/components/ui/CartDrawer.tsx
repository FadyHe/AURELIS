/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { useStore } from '../../stores/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ArrowLeft, ArrowRight, Sparkles, CreditCard, Gift, Truck, Check } from 'lucide-react';
import { PERFUMES } from '../../data/perfumes';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal, 
    selectedSample, 
    setSelectedSample,
    checkoutStep,
    setCheckoutStep,
    clearCart,
    showToast
  } = useStore();

  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingCityZip, setShippingCityZip] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [generatedTracking, setGeneratedTracking] = useState('');

  const total = getCartTotal();

  const handleNextStep = () => {
    if (checkoutStep === 'idle') {
      setCheckoutStep('shipping');
    } else if (checkoutStep === 'shipping') {
      if (!shippingName || !shippingAddress || !shippingCity) {
        showToast('Please fulfill your structural shipping coordinates', 'info');
        return;
      }
      setCheckoutStep('payment');
    } else if (checkoutStep === 'payment') {
      if (!cardNumber || !cardName) {
        showToast('Please specify credentials for payment transit', 'info');
        return;
      }
      // Generate standard luxury order token
      const trackingId = `AR-SC-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedTracking(trackingId);
      setCheckoutStep('completed');
      showToast('Transaction cleared by bank gateway.', 'success');
    }
  };

  const handleBackStep = () => {
    if (checkoutStep === 'shipping') {
      setCheckoutStep('idle');
    } else if (checkoutStep === 'payment') {
      setCheckoutStep('shipping');
    }
  };

  const handleFinishCheckout = () => {
    clearCart();
    setCheckoutStep('idle');
    setCartOpen(false);
    setSelectedSample(null);
    // Reset forms
    setShippingName('');
    setShippingAddress('');
    setShippingCity('');
    setShippingCityZip('');
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvc('');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-[#000]/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Sliding drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 180 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-115 md:w-140 bg-[#0C0C0D] text-white border-l border-white/10 shadow-3xl flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display font-medium text-sm tracking-[0.25em] text-[#D4AF37] uppercase">MAISON COLLECTION</span>
                {cart.length > 0 && (
                  <span className="text-[10px] font-mono text-gray-500">[{cart.reduce((s, i) => s + i.quantity, 0)} Items]</span>
                )}
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1.5 hover:bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 rounded-full transition-all cursor-pointer"
                aria-label="Close Shopping Drawer"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Main Content Body */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              
              {/* IF CART IS EMPTY */}
              {cart.length === 0 && checkoutStep !== 'completed' && (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border border-dashed border-white/10 flex items-center justify-center text-[#D4AF37]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm uppercase tracking-widest text-[#E5E3DB]">No fragrances selected</h4>
                    <p className="text-gray-500 text-xs mt-1 max-w-xs leading-relaxed">
                      Your premium vial list is empty. Visit the cinematic journey or the portfolio collection to secure raw glass decants.
                    </p>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="px-6 py-2 bg-[#D4AF37] text-black font-mono text-[10px] tracking-widest uppercase rounded-lg hover:bg-white transit transition-colors cursor-pointer"
                  >
                    RETURN TO GALLERY
                  </button>
                </div>
              )}

              {/* TRANSIT STEP 1: REVIEW DETAILS */}
              {cart.length > 0 && checkoutStep === 'idle' && (
                <div className="space-y-6">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase block border-b border-white/5 pb-2">
                    01. CHOSEN CONCENTRATES
                  </span>

                  {/* List items */}
                  <div className="space-y-4 divide-y divide-white/5">
                    {cart.map((item, idx) => (
                      <div key={`${item.perfume.id}-${item.size}`} className={`flex gap-4 items-start ${idx > 0 ? 'pt-4' : ''}`}>
                        {/* Bottle color proxy placeholder */}
                        <div className="w-16 h-20 bg-white/[0.02] border border-white/10 rounded-xl relative flex items-center justify-center flex-shrink-0 group overflow-hidden">
                          <div className={`w-8 h-12 rounded-lg border border-[#D4AF37]/40 relative flex flex-col justify-between p-1.5`}>
                            <div className="w-3 h-1.5 bg-gray-500 rounded-sm mx-auto -top-2 relative" />
                            <span className="font-mono text-[6px] text-center text-gray-400">{item.perfume.name.substring(0,3)}</span>
                          </div>
                        </div>

                        {/* Description & adjustments */}
                        <div className="flex-grow space-y-1">
                          <div className="flex justify-between items-baseline">
                            <span className="font-display font-semibold text-xs tracking-wider uppercase text-white">{item.perfume.name}</span>
                            <span className="font-mono text-xs text-[#D4AF37]">€{item.price * item.quantity}.00</span>
                          </div>
                          <p className="font-mono text-[9px] text-[#D4AF37]/80 uppercase tracking-widest">{item.size} / PARFUM EXTRACT</p>
                          <p className="font-sans text-[10px] text-gray-500 line-clamp-1">{item.perfume.scentProfile}</p>
                          
                          {/* Sizing quantity controls */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-md px-1 py-0.5">
                              <button
                                onClick={() => updateQuantity(item.perfume.id, item.size, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-xs text-gray-500 hover:text-white transition-all cursor-pointer"
                              >
                                -
                              </button>
                              <span className="font-mono text-[11px] w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.perfume.id, item.size, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-xs text-gray-500 hover:text-white transition-all cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.perfume.id, item.size)}
                              className="text-gray-600 hover:text-red-400 transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* COMPLEMENTARY SAMPLING OFFER SECTION */}
                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-3.5">
                    <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#D4AF37]" /> COMPLEMENTARY WAX-SEALED SAMPLE
                    </span>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                      Our signature luxury covenant: select a 2ml trial vial below. Spritz this sample first. If it does not build perfect chemistry on your skin, return the main vacuum-sealed bottle completely unopened within 30 days for an absolute refund.
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {PERFUMES.map(p => {
                        const isSelected = selectedSample === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setSelectedSample(p.id as any)}
                            className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${isSelected ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white' : 'bg-transparent border-white/5 hover:border-white/10 text-gray-500 hover:text-gray-300'}`}
                            id={`opt-sample-${p.id}`}
                          >
                            <span className="block font-display font-semibold text-[9px] uppercase tracking-wider">{p.name}</span>
                            <span className="block font-mono text-[7px] text-gray-400/75 mt-0.5 mt-0.5 uppercase">2ml decant</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TRANSIT STEP 2: SHIPPING DETAILS */}
              {checkoutStep === 'shipping' && (
                <div className="space-y-4">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase block border-b border-white/5 pb-2">
                    02. SCHEDULING TRANSIT COORDINATES
                  </span>

                  <div className="space-y-3 text-xs font-mono">
                    <div>
                      <label className="text-gray-500 block mb-1">RECIPIENT FULL NAME</label>
                      <input
                        type="text"
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        placeholder="Johnathan Doe"
                        className="w-full bg-[#18181A] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 block mb-1">CONCIERGE RESIDENTIAL ADDRESS</label>
                      <input
                        type="text"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Blvd Saint-Germain, Apt 4"
                        className="w-full bg-[#18181A] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-500 block mb-1">CITY</label>
                        <input
                          type="text"
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                          placeholder="Paris"
                          className="w-full bg-[#18181A] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-gray-500 block mb-1">ZIP / CODE</label>
                        <input
                          type="text"
                          value={shippingCityZip}
                          onChange={(e) => setShippingCityZip(e.target.value)}
                          placeholder="75006"
                          className="w-full bg-[#18181A] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex gap-3 text-[10px] text-gray-500 items-start">
                    <Truck className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-sans">
                      All decants are safely blanket-wrapped in custom cedarwood protection boxes and dispatched via registered premium priority air freight. Free globally.
                    </p>
                  </div>
                </div>
              )}

              {/* TRANSIT STEP 3: payment GATEWAY */}
              {checkoutStep === 'payment' && (
                <div className="space-y-4">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase block border-b border-white/5 pb-2">
                    03. ESCROW TRANSIT DEPOSIT
                  </span>

                  <div className="space-y-3 text-xs font-mono">
                    <div>
                      <label className="text-gray-500 block mb-1">CARDHOLDER NAME</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Johnathan Doe"
                        className="w-full bg-[#18181A] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 block mb-1">CREDIT CARD NUMBER</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full bg-[#18181A] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-500 block mb-1">EXPIRY</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM / YY"
                          className="w-full bg-[#18181A] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-gray-500 block mb-1">CVC SECURITY</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-[#18181A] border border-white/5 focus:border-[#D4AF37] text-white p-3 rounded-lg focus:outline-none focus:ring-0 text-xs font-mono"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex gap-3 text-[10px] text-gray-500 items-start">
                    <CreditCard className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-sans">
                      Secure banking transit: 3D Secure, Stripe Core protocols configured. Your currency accounts remain heavily protected and encrypted.
                    </p>
                  </div>
                </div>
              )}

              {/* TRANSIT STEP 4: ORDER SUCCESS */}
              {checkoutStep === 'completed' && (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display font-semibold text-lg uppercase tracking-widest text-[#E5E3DB]">ESCROW DEPOSIT COMPLETED</h4>
                    <span className="font-mono text-[10px] text-[#D4AF37] block">REGISTERED TRACKING: {generatedTracking}</span>
                    <p className="text-gray-500 text-xs max-w-sm leading-relaxed font-sans mt-3">
                      Your order has been filed under Grasse batch logs. A high-end atmospheric sample card, the complementary decant, along with your secure perfume items have been prepared. High-priority dispatch air tracking has started.
                    </p>
                  </div>

                  <div className="w-full bg-white/[0.01] border border-white/5 rounded-xl p-4 text-left space-y-2 font-mono text-[10px] text-gray-400">
                    <p><span className="text-gray-600 uppercase">RECIPIENT:</span> {shippingName}</p>
                    <p><span className="text-gray-600 uppercase">DELIVERY ZONE:</span> {shippingCity}, {shippingAddress}</p>
                    <p><span className="text-gray-600 uppercase">SAMPLE DECANT:</span> {selectedSample ? `${selectedSample.toUpperCase()} (2ml)` : 'UNSPECIFIED'}</p>
                    <p><span className="text-gray-600 uppercase">FEE CLEARED:</span> €{total}.00</p>
                  </div>

                  <button
                    onClick={handleFinishCheckout}
                    className="w-full py-3 bg-[#D4AF37] text-black font-semibold text-[10px] tracking-widest uppercase rounded-lg hover:bg-white transition-colors cursor-pointer"
                  >
                    RETURN TO MAISON PORTAL
                  </button>
                </div>
              )}

            </div>

            {/* Sticky Pricing Summary & Progress Controls */}
            {cart.length > 0 && checkoutStep !== 'completed' && (
              <div className="p-6 border-t border-white/5 bg-[#101011] space-y-4">
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>CONCENTRATE NET VALUE</span>
                    <span>€{total}.00</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>CEDARWOOD REINFORCED PACKAGING</span>
                    <span className="text-emerald-400">COMPLEMENTARY</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>REGISTERED AIR DISPATCH</span>
                    <span className="text-emerald-400">COMPLEMENTARY</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold text-sm pt-2 border-t border-white/5 mt-2">
                    <span>TOTAL TRANSIT VALUATION</span>
                    <span className="text-[#D4AF37]">€{total}.00</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  {checkoutStep !== 'idle' && (
                    <button
                      onClick={handleBackStep}
                      className="px-4 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all cursor-pointer flex items-center justify-center border border-white/5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={handleNextStep}
                    className="flex-grow py-3 bg-[#D4AF37] hover:bg-white text-black font-semibold text-[10px] tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>
                      {checkoutStep === 'idle' && 'PROCEED TO DISPATCH'}
                      {checkoutStep === 'shipping' && 'PROCEED TO SECURITY DEPOSIT'}
                      {checkoutStep === 'payment' && `AUTHORIZE €${total}.00 TRANSFER`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
