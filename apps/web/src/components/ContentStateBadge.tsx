import type { ContentState } from '@/lib/types';

type ContentStateBadgeProps = {
  state: ContentState;
};

const toneByState: Record<ContentState, string> = {
  'Full case study': 'badge-primary',
  'Short proof page': 'badge-secondary',
  'Lab note': 'badge-info',
  'Archived prototype': 'badge-warning',
  'Public-safe summary': 'badge-success',
  'Draft / private': 'badge-error'
};

export function ContentStateBadge({ state }: ContentStateBadgeProps) {
  return <span className={`badge ${toneByState[state]} badge-sm`}>{state}</span>;
}

