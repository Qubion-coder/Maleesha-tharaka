import React, { useState } from 'react';
import { Copy, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export default function AdminPage() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  
  const [generated, setGenerated] = useState<{
    url: string;
    message: string;
    greeting: string;
  } | null>(null);
  const [copiedType, setCopiedType] = useState<'link' | 'message' | null>(null);

  const getDisplayName = (pfx: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return '';
    switch (pfx) {
      case 'Mr.': return `Mr. ${trimmed}`;
      case 'Mrs.': return `Mrs. ${trimmed}`;
      case 'Miss': return `Miss ${trimmed}`;
      case 'Mr. & Mrs.': return `Mr. & Mrs. ${trimmed}`;
      case 'Family': return `${trimmed} and Family`;
      case 'Dear': return trimmed;
      default: return trimmed;
    }
  };

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    const displayName = getDisplayName(prefix, guestName);
    // Use URL encoding for the guest name
    let path = encodeURIComponent(displayName);
    if (prefix === 'Dear') {
        // As per example, if Dear Sanjaya -> link is /sanjaya (if desired). But wait, we need to show "Sanjaya" in the website! 
        // We can just use the displayName. So /Sanjaya
        path = encodeURIComponent(guestName.trim());
    }
    
    // Actually, it's safer to always encode the displayName so the website can just display it directly!
    // Example: "Family Sanjaya" -> "Sanjaya and Family" -> "/Sanjaya%20and%20Family"
    // "Mr. Sanjaya" -> "/Mr.%20Sanjaya"
    // Let's use the exact requested displayName in the URL.
    const url = `${window.location.origin}/${encodeURIComponent(displayName)}`;
    const greeting = getDisplayName(prefix, guestName);
    
    const message = `Dear ${greeting} ❤️\n\nWith joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${url}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Maleesha & Tharaka`;
    
    setGenerated({ url, message, greeting });
  };

  const copyToClipboard = (text: string, type: 'link' | 'message') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-xl border border-[#EAE1D3] p-8 md:p-10 mb-8">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-[#F7E7CE] rounded-full flex items-center justify-center mb-4 shadow-inner">
            <LinkIcon className="text-[#8B7355] w-6 h-6" />
          </div>
          <h1 className="serif text-3xl md:text-4xl text-[#3D2B1F] tracking-widest uppercase font-bold text-center">Link Generator</h1>
          <p className="text-zinc-500 mt-2 text-sm uppercase tracking-widest text-center">Wedding Invitation</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[#8B7355] text-xs font-bold uppercase tracking-widest mb-2">
              Select Prefix
            </label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EAE1D3] rounded-xl px-4 py-3 text-[#3D2B1F] focus:outline-none focus:border-[#C8B29E] transition-colors"
            >
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Miss">Miss</option>
              <option value="Mr. & Mrs.">Mr. & Mrs.</option>
              <option value="Family">Family</option>
              <option value="Dear">Dear</option>
            </select>
          </div>

          <div>
            <label className="block text-[#8B7355] text-xs font-bold uppercase tracking-widest mb-2">
              Guest Name
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Sanjaya"
              className="w-full bg-[#FAF7F2] border border-[#EAE1D3] rounded-xl px-4 py-3 text-[#3D2B1F] focus:outline-none focus:border-[#C8B29E] transition-colors"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!guestName.trim()}
            className="w-full bg-[#3D2B1F] text-white rounded-xl py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#8B7355] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            Generate Link
          </button>
        </div>
      </div>

      {generated && (
        <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-xl border border-[#EAE1D3] p-8 md:p-10 animate-fade-in">
          <div className="mb-6">
            <h3 className="text-[#8B7355] text-xs font-bold uppercase tracking-widest mb-2">Generated Link</h3>
            <div className="bg-[#FAF7F2] border border-[#EAE1D3] rounded-xl p-4 break-all text-[#3D2B1F] text-sm">
              {generated.url}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[#8B7355] text-xs font-bold uppercase tracking-widest mb-2">Message Preview</h3>
            <div className="bg-[#FAF7F2] border border-[#EAE1D3] rounded-xl p-4 text-[#3D2B1F] text-sm whitespace-pre-wrap">
              {generated.message}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => copyToClipboard(generated.url, 'link')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-bold uppercase tracking-wider text-xs transition-colors border ${
                copiedType === 'link' 
                  ? 'bg-[#EAE1D3] text-[#3D2B1F] border-[#EAE1D3]' 
                  : 'bg-white text-[#3D2B1F] border-[#EAE1D3] hover:bg-[#FAF7F2]'
              }`}
            >
              {copiedType === 'link' ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              Copy Link Only
            </button>
            <button
              onClick={() => copyToClipboard(generated.message, 'message')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-bold uppercase tracking-wider text-xs transition-colors border ${
                copiedType === 'message' 
                  ? 'bg-[#3D2B1F] text-white border-[#3D2B1F]' 
                  : 'bg-[#C8B29E] text-white border-[#C8B29E] hover:bg-[#8B7355]'
              }`}
            >
              {copiedType === 'message' ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              Copy Full Message
            </button>
          </div>
          
          {copiedType && (
            <p className="text-center text-[#8B7355] text-xs font-bold uppercase tracking-widest mt-4 animate-fade-in">
              Copied to clipboard!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
