-- Support unified request form submissions from FeedbackModal.
ALTER TABLE public.feedback
ADD COLUMN IF NOT EXISTS email TEXT;

-- Allow legacy and unified request type values.
ALTER TABLE public.feedback
DROP CONSTRAINT IF EXISTS feedback_type_check;

ALTER TABLE public.feedback
ADD CONSTRAINT feedback_type_check CHECK (type IN ('bug', 'feature', 'request'));

ALTER TABLE public.feedback
ALTER COLUMN type SET DEFAULT 'request';
