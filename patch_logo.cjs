const fs = require('fs');
const path = 'src/components/brand/DengoLogo.tsx';

const newContent = `import * as React from 'react';

interface DengoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'badge' | 'avatar';
  showSubtext?: boolean;
  className?: string;
}

export const DengoLogo: React.FC<DengoLogoProps> = ({
  size = 'md',
  variant = 'full',
  showSubtext = true,
  className = '',
}) => {
  const sizeMap = {
    sm: 48,
    md: 64,
    lg: 120,
    xl: 160,
  };

  const dim = sizeMap[size];

  return (
    <div className={\`inline-flex items-center justify-center \${className}\`}>
      <img
        src="/logo.jpg"
        alt="Dengo 3D Logo"
        width={dim}
        height={dim}
        className={\`object-contain shrink-0 transition-transform duration-300 hover:scale-105 select-none \${variant === 'avatar' ? 'rounded-full border-2 border-pink-200' : 'rounded-3xl'}\`}
        style={{ width: dim, height: dim }}
      />
    </div>
  );
};
`;

fs.writeFileSync(path, newContent, 'utf8');
