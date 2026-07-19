import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Copy,
  Globe,
  MessageSquare,
  Phone,
  Send,
  Smartphone,
  WifiOff,
} from 'lucide-react';

const Messages = () => {
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [smsNumber] = useState('+254700123456');
  const [ussdCode] = useState('*384#1234#');

  const languages = [
    { code: 'sw', name: 'Kiswahili' },
    { code: 'en', name: 'English' },
    { code: 'so', name: 'Somali' },
    { code: 'luo', name: 'Dholuo' },
    { code: 'kik', name: 'Gikuyu' },
    { code: 'kal', name: 'Kalenjin' },
  ];

  const commands = {
    en: {
      report: 'REPORT [name, location, age, description]',
      status: 'STATUS [CaseID]',
      update: 'UPDATE [CaseID] [details]',
      join: 'JOIN [CaseID]',
      help: 'HELP',
      emergency: 'EMERGENCY',
    },
    sw: {
      report: 'REPORT [jina, mahali, umri, maelezo]',
      status: 'STATUS [Kitambulisho]',
      update: 'UPDATE [Kitambulisho] [maelezo]',
      join: 'JOIN [Kitambulisho]',
      help: 'HELP',
      emergency: 'EMERGENCY',
    },
    so: {
      report: 'REPORT [magaca, goobta, da, sharaxaad]',
      status: 'STATUS [Aqoonsiga]',
      update: 'UPDATE [Aqoonsiga] [faahfaahin]',
      join: 'JOIN [Aqoonsiga]',
      help: 'HELP',
      emergency: 'EMERGENCY',
    },
    luo: {
      report: 'REPORT [nying, kama, higa, loso]',
      status: 'STATUS [ID]',
      update: 'UPDATE [ID] [weche]',
      join: 'JOIN [ID]',
      help: 'HELP',
      emergency: 'EMERGENCY',
    },
    kik: {
      report: 'REPORT [rĩĩtwa, kũrĩa, mĩaka, kũũria]',
      status: 'STATUS [ID]',
      update: 'UPDATE [ID] [weche]',
      join: 'JOIN [ID]',
      help: 'HELP',
      emergency: 'EMERGENCY',
    },
    kal: {
      report: 'REPORT [nying, kama, higa, loso]',
      status: 'STATUS [ID]',
      update: 'UPDATE [ID] [weche]',
      join: 'JOIN [ID]',
      help: 'HELP',
      emergency: 'EMERGENCY',
    },
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const getCommand = (cmd) => commands[selectedLanguage]?.[cmd] || commands.en[cmd];

  return (
    <div className="space-y-6 p-6">
      <div className="rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/10 p-2 backdrop-blur-sm">
            <WifiOff size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">SMS / USSD Access</h2>
            <p className="text-sm text-white/70">Rural users can report and receive updates without internet.</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs">📱 No internet required</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs">🌍 Works on any phone</span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs">📶 Works on basic mobile networks</span>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Globe size={18} className="text-slate-500" />
          <span className="text-sm text-slate-600">Select the user language:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-600" />
              <h3 className="font-semibold text-slate-800">Send SMS</h3>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg bg-white p-3">
                <p className="text-sm text-slate-500">1. Open your SMS app.</p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-sm text-slate-500">2. Send to the TracePoint SMS number:</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-base font-bold text-blue-600">{smsNumber}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(smsNumber)}
                    className="rounded-lg bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300"
                  >
                    {copied ? '✅' : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-sm text-slate-500">3. Use a command like:</p>
                <div className="mt-1 rounded bg-slate-100 p-2 font-mono text-xs text-slate-700">{getCommand('report')}</div>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-sm text-slate-500">4. Press Send.</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Phone size={18} className="text-purple-600" />
              <h3 className="font-semibold text-slate-800">Use USSD</h3>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg bg-white p-3">
                <p className="text-sm text-slate-500">1. Dial the code:</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="font-mono text-lg font-bold text-purple-600">{ussdCode}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(ussdCode)}
                    className="rounded-lg bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300"
                  >
                    {copied ? '✅' : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-sm text-slate-500">2. Follow the menu prompts.</p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-sm text-slate-500">3. Submit the case details.</p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-sm text-slate-500">4. Receive status updates by SMS.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-100 p-4">
          <h4 className="mb-2 text-sm font-semibold text-slate-800">Available SMS Commands</h4>
          <div className="grid gap-2 text-sm md:grid-cols-2">
            <div className="rounded-lg bg-white p-2"><span className="font-mono text-blue-600">REPORT</span><span className="ml-1 text-slate-500">Submit a case</span></div>
            <div className="rounded-lg bg-white p-2"><span className="font-mono text-blue-600">STATUS</span><span className="ml-1 text-slate-500">Check a case</span></div>
            <div className="rounded-lg bg-white p-2"><span className="font-mono text-blue-600">UPDATE</span><span className="ml-1 text-slate-500">Update a case</span></div>
            <div className="rounded-lg bg-white p-2"><span className="font-mono text-blue-600">JOIN</span><span className="ml-1 text-slate-500">Join a case</span></div>
            <div className="rounded-lg bg-white p-2"><span className="font-mono text-blue-600">HELP</span><span className="ml-1 text-slate-500">Get command help</span></div>
            <div className="rounded-lg bg-white p-2"><span className="font-mono text-red-600">EMERGENCY</span><span className="ml-1 text-slate-500">Immediate help</span></div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <CheckCircle size={16} />
            How the SMS flow works
          </h4>
          <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-emerald-700">
            <li>A user in a rural area sends an SMS to {smsNumber}.</li>
            <li>The system reads the message and identifies the request.</li>
            <li>The case is created or updated in the dashboard.</li>
            <li>The user receives the response through SMS, even with weak or no internet.</li>
          </ol>
        </div>

        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="flex items-center gap-2 text-sm text-red-700">
            <AlertTriangle size={16} />
            <strong>Emergency:</strong> Call 999 or 112 immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
