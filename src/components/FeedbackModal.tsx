import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getTheme, ThemeId } from '@/lib/themes';
import { toast } from 'sonner';
import { CircleHelp } from 'lucide-react';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  themeId?: ThemeId;
}

const FEEDBACK_RECIPIENT = 'pukrvi@gmail.com';

const FeedbackModal = ({ open, onOpenChange, themeId = 'infiniti' }: FeedbackModalProps) => {
  const theme = getTheme(themeId);
  const [email, setEmail] = useState('');
  const [requestHeading, setRequestHeading] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!requestHeading.trim()) {
      toast.error('Please add a request heading');
      return;
    }

    if (!description.trim()) {
      toast.error('Please add a description');
      return;
    }

    const subject = `[FormatMD] ${requestHeading.trim()}`;
    const body = `From: ${normalizedEmail}\n\n${description.trim()}`;
    const mailtoUrl = `mailto:${FEEDBACK_RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    toast.success('Opening your email client…');
    setEmail('');
    setRequestHeading('');
    setDescription('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg"
        style={{
          backgroundColor: theme.colors.background,
          border: `1px solid ${theme.colors.heading}30`,
          color: theme.colors.text,
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: theme.colors.heading }}>Send a Request</DialogTitle>
          <DialogDescription style={{ color: theme.colors.text + '60' }}>
            Submit opens your default mail client with the message pre-filled.
          </DialogDescription>
        </DialogHeader>

        {/* Email */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <label className="text-xs font-mono" style={{ color: theme.colors.text + '78' }}>
              Email
            </label>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex"
                    aria-label="Email privacy information"
                  >
                    <CircleHelp className="w-3.5 h-3.5" style={{ color: theme.colors.text + '65' }} />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-[260px] text-xs font-mono"
                  style={{
                    backgroundColor: theme.colors.panel,
                    border: `1px solid ${theme.colors.heading}25`,
                    color: theme.colors.text,
                  }}
                >
                  Included in the email body so we can reply. Nothing is stored or transmitted by FormatMD itself.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            maxLength={254}
            className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-transparent focus:outline-none"
            style={{
              border: `1px solid ${theme.colors.heading}20`,
              color: theme.colors.text,
            }}
          />
        </div>

        {/* Request heading */}
        <div className="space-y-2">
          <label className="text-xs font-mono" style={{ color: theme.colors.text + '78' }}>
            Request Heading
          </label>
          <input
            value={requestHeading}
            onChange={(e) => setRequestHeading(e.target.value)}
            placeholder="Short summary of your request"
            maxLength={200}
            className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-transparent focus:outline-none"
            style={{
              border: `1px solid ${theme.colors.heading}20`,
              color: theme.colors.text,
            }}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs font-mono" style={{ color: theme.colors.text + '78' }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your request in detail..."
            maxLength={2000}
            rows={4}
            className="w-full px-3 py-2 rounded-lg text-sm font-mono bg-transparent resize-none focus:outline-none"
            style={{
              border: `1px solid ${theme.colors.heading}20`,
              color: theme.colors.text,
            }}
          />
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          className="w-full font-mono"
          style={{
            backgroundColor: theme.colors.heading,
            color: theme.colors.background,
          }}
        >
          Open Email Client
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
