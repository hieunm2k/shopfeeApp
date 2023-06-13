import React from 'react';
import {Path, Svg} from 'react-native-svg';

function ArrowRight({width = 16, height = 16, color = '#FEFEFE'}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3.33301 8H12.6663"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8 3.33337L12.6667 8.00004L8 12.6667"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default ArrowRight;
