import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className = '', 
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  };
  
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-10 blur-sm"></div>
        <div className="relative w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
          {/* Stylized S */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-3/5 h-3/5 text-white" 
            fill="currentColor"
          >
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6H8C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10H16C18.2 10 20 11.8 20 14C20 16.2 18.2 18 16 18H12C10.9 18 10 18.9 10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V19C14 18.4 14.4 18 15 18C15.6 18 16 18.4 16 19V20C16 22.2 14.2 24 12 24C9.8 24 8 22.2 8 20C8 18.9 8.9 18 10 18H14C15.1 18 16 17.1 16 16C16 14.9 15.1 14 14 14H6C3.8 14 2 12.2 2 10C2 7.8 3.8 6 6 6H10C11.1 6 12 5.1 12 4V2Z" />
          </svg>
          
          {/* Chart accent */}
          {size !== 'sm' && (
            <div className="absolute bottom-1 right-1 flex gap-0.5 opacity-60">
              <div className="w-0.5 h-2 bg-cyan-400 rounded-full"></div>
              <div className="w-0.5 h-3 bg-cyan-400 rounded-full"></div>
              <div className="w-0.5 h-1.5 bg-cyan-400 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight ${textSizeClasses[size]}`}>
            Smart Budget
          </span>
          {size !== 'sm' && (
            <span className="text-xs text-muted-foreground leading-tight -mt-0.5">
              Intelligent Control
            </span>
          )}
        </div>
      )}
    </div>
  );
};
