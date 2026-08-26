import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  status,
  className,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);

  const getInitials = (str: string) => {
    if (!str) return '3D';
    const parts = str.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-zinc-500',
    busy: 'bg-amber-500',
  };

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground ring-1 ring-border select-none overflow-hidden',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || name}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-background',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};
