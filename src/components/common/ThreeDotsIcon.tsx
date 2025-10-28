/**
 * ThreeDotsIcon Component
 * Custom three dots menu icon
 */

import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

interface ThreeDotsIconProps {
  size?: number;
  color?: string;
}

export const ThreeDotsIcon: React.FC<ThreeDotsIconProps> = ({ size = 24, color = '#000000' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_4418_9934)">
        <Path
          d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
          stroke={color}
          strokeWidth="1.5"
        />
        <Path
          d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
          stroke={color}
          strokeWidth="1.5"
        />
        <Path
          d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
          stroke={color}
          strokeWidth="1.5"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4418_9934">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
