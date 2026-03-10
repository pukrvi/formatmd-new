import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getTheme, ThemeId } from '@/lib/themes';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, Loader2, CircleHelp } from 'lucide-react';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  themeId?: ThemeId;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const compressFile = async (file: File): Promise<File> => {
  // For images, compress using canvas
  if (file.type.startsWith('image/')) {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          resolve(file);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (!blob) {
              resolve(file);
              return;
            }
            resolve(new File([blob], file.name, { type: 'image/jpeg' }));
          },
          'image/jpeg',
          0.7
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(file);
      };
      img.src = url;
    });
  }
  return file;
};

const FeedbackModal = ({ open, onOpenChange, themeId = 'infiniti' }: FeedbackModalProps) => {
  const theme = getTheme(themeId);
  const [email, setEmail] = useState('');
  const [requestHeading, setRequestHeading] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const remainingSlots = Math.max(0, 3 - files.length);
    if (remainingSlots === 0) {
      toast.info('Maximum of 3 attachments reached');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const filesToProcess = newFiles.slice(0, remainingSlots);
    if (newFiles.length > remainingSlots) {
      toast.info(`Only ${remainingSlots} additional file(s) can be attached`);
    }

    const valid: File[] = [];
    for (const f of filesToProcess) {
      if (f.size > MAX_FILE_SIZE) {
        toast.error(`${f.name} exceeds 5MB limit`);
        continue;
      }
      const compressed = await compressFile(f);
      valid.push(compressed);
    }
    setFiles((prev) => [...prev, ...valid]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
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

    setSubmitting(true);

    try {
      // Upload files to storage
      const uploadedPaths: string[] = [];
      for (const file of files) {
        const uniqueId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const safeName = file.name.replace(/[^\w.-]/g, '_');
        const path = `feedback/${uniqueId}-${safeName}`;
        const { error } = await supabase.storage.from('feedback-attachments').upload(path, file);
        if (error) {
          throw new Error(`Attachment upload failed for ${file.name}: ${error.message}`);
        }
        uploadedPaths.push(path);
      }

      // Insert feedback
      const { error } = await supabase.from('feedback').insert({
        type: 'request',
        email: normalizedEmail.slice(0, 254),
        title: requestHeading.trim().slice(0, 200),
        description: description.trim().slice(0, 2000),
        attachments: uploadedPaths,
      });

      if (error) throw error;

      toast.success('Request submitted! Thank you 🙏');
      setEmail('');
      setRequestHeading('');
      setDescription('');
      setFiles([]);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
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
            Share your request and we will review it quickly.
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
                  We do not spam or sell your data. We only use email updates for your request and spam prevention.
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

        {/* File upload */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.txt,.log"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-all"
            style={{
              border: `1px dashed ${theme.colors.heading}30`,
              color: theme.colors.text + '60',
            }}
          >
            <Upload className="w-3 h-3" />
            Attach files (max 5MB each, up to 3)
          </button>

          {files.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono"
                  style={{ backgroundColor: theme.colors.panel, color: theme.colors.text + '80' }}
                >
                  {f.name.slice(0, 20)}
                  <button type="button" onClick={() => removeFile(i)}>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full font-mono"
          style={{
            backgroundColor: theme.colors.heading,
            color: theme.colors.background,
          }}
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
