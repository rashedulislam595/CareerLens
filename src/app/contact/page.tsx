'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please enter all fields');
      return;
    }
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
    toast.success('Your message was delivered successfully!');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="section-container max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Contact <span className="gradient-text">Our Team</span>
          </h1>
          <p className="text-white/50 max-w-md mx-auto text-sm sm:text-base">
            Have questions about CareerLens AI? Reach out and we&apos;ll reply shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Card */}
          <div className="glass-card p-6 sm:p-8 border border-white/5 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Get In Touch</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Whether you&apos;re a job seeker looking for support, or a company seeking hiring integration, our support representatives are ready to assist.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span>support@careerlens.ai</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-xs text-white/40">
              * Inquiries sent during weekends will be processed next Monday morning.
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-card p-6 sm:p-8 border border-white/5">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Thank You!</h3>
                <p className="text-sm text-white/50 max-w-xs">
                  We&apos;ve received your request and will contact you at your email address soon.
                </p>
                <button onClick={() => setSent(false)} className="btn-secondary text-xs">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    id="contact-name"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    id="contact-email"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry..."
                    id="contact-message"
                    className="input-field py-2.5 resize-none text-sm"
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
