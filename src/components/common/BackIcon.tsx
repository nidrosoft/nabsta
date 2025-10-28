/**
 * BackIcon Component
 * Custom back button icon using SVG
 */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BackIconProps {
  size?: number;
  color?: string;
}

export const BackIcon: React.FC<BackIconProps> = ({ 
  size = 24, 
  color = '#000000' 
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path 
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" 
        stroke={color}
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M8.9999 15.3797H13.9199C15.6199 15.3797 16.9999 13.9997 16.9999 12.2997C16.9999 10.5997 15.6199 9.21973 13.9199 9.21973H7.1499" 
        stroke={color}
        strokeWidth="1.5" 
        strokeMiterlimit="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M8.57 10.7701L7 9.19012L8.57 7.62012" 
        stroke={color}
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
};
