'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Delete, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

const REQUIRED_PIN = '188199';

export default function AdminPinLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // If already authenticated, redirect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('gcr_surya_admin_auth');
      if (auth === 'true') {
        router.push('/admin');
      }
    }
  }, [router]);

  // Keyboard number listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter' && pin.length === 6) {
        verifyPin(pin);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  const handleDigit = (digit: string) => {
    if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);
      setErrorMsg('');
      if (newPin.length === 6) {
        verifyPin(newPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleClear = () => {
    setPin('');
    setErrorMsg('');
  };

  const verifyPin = (candidatePin: string) => {
    if (candidatePin === REQUIRED_PIN) {
      setIsSuccess(true);
      setErrorMsg('');
      if (typeof window !== 'undefined') {
        localStorage.setItem('gcr_surya_admin_auth', 'true');
        localStorage.setItem('gcr_surya_admin_user', 'admin@gcrsuryatownship.com');
      }
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } else {
      setErrorMsg('Incorrect PIN. Please enter the valid security PIN.');
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-surya-navy-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-surya-navy-800/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-surya-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-sm w-full relative z-10">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white p-1 border-2 border-surya-orange-500 shadow-2xl mx-auto mb-4 hover:scale-105 transition-transform">
            <Image
              src="/images/gcr-surya-logo.jpg"
              alt="GCR Surya Township"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🏢</span>
            <h1 className="font-serif text-2xl font-bold text-white tracking-wide">
              ADMIN ACCESS
            </h1>
          </div>
          <p className="text-xs uppercase tracking-widest text-surya-orange-400 font-semibold mt-1">
            GCR SURYA TOWNSHIP • KOILAKUNTLA
          </p>
        </div>

        {/* PIN Entry Card */}
        <div className="bg-white rounded-3xl p-7 shadow-2xl border border-slate-100/90 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surya-navy-50 text-surya-navy-900 text-xs font-semibold mb-3 border border-surya-navy-200">
            <Lock className="w-3.5 h-3.5 text-surya-orange-500" />
            <span>Enter 6-Digit Admin PIN</span>
          </div>

          <p className="text-xs text-slate-500 mb-6">
            Enter authorized security PIN to access hero video and plot management.
          </p>

          {/* 6 Digit Display Boxes */}
          <div className="flex items-center justify-center gap-2.5 mb-6">
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const hasDigit = pin.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-11 h-13 rounded-2xl flex items-center justify-center text-xl font-bold font-mono transition-all duration-200 ${
                    isSuccess
                      ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-600'
                      : hasDigit
                      ? 'bg-surya-navy-50 border-2 border-surya-orange-500 text-surya-navy-950 shadow-md shadow-surya-orange-500/10 scale-105'
                      : 'bg-slate-50 border-2 border-slate-200 text-slate-300'
                  }`}
                >
                  {hasDigit ? (
                    <span className="w-3 h-3 rounded-full bg-surya-orange-500" />
                  ) : (
                    <span className="text-slate-300">•</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-2.5 mb-4 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200 animate-fade-in">
              {errorMsg}
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="p-2.5 mb-4 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center justify-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>PIN Verified! Accessing Admin Dashboard...</span>
            </div>
          )}

          {/* On-Screen Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto mb-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleDigit(digit)}
                className="h-13 rounded-2xl bg-slate-50 hover:bg-surya-navy-900 hover:text-white text-slate-800 font-serif text-xl font-bold border border-slate-200/80 shadow-sm active:scale-95 transition-all flex items-center justify-center"
              >
                {digit}
              </button>
            ))}

            <button
              type="button"
              onClick={handleClear}
              className="h-13 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => handleDigit('0')}
              className="h-13 rounded-2xl bg-slate-50 hover:bg-surya-navy-900 hover:text-white text-slate-800 font-serif text-xl font-bold border border-slate-200/80 shadow-sm active:scale-95 transition-all flex items-center justify-center"
            >
              0
            </button>

            <button
              type="button"
              onClick={handleBackspace}
              className="h-13 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 active:scale-95 transition-all flex items-center justify-center"
              title="Backspace"
              aria-label="Delete last digit"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>

        </div>

        <div className="text-center mt-6 text-xs text-slate-400">
          <p>GCR Surya Township • Authorized Access Only</p>
        </div>
      </div>
    </div>
  );
}
