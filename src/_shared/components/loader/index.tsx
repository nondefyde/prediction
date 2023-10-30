import { Preloader, ThreeDots } from 'react-preloader-icon';
import React, { FC } from 'react';
import { LoaderProps } from 'react-preloader-icon/Preloader';

export const AppLoader = (props: {
  size?: number;
  style?: Record<string, any>;
  use?: FC<LoaderProps>;
  strokeColor?: string;
}) => {
  const { size = 80, style, use, strokeColor } = props;
  return (
    <Preloader
      data-testid={'dti_app_loader'}
      use={use || ThreeDots}
      size={size}
      strokeWidth={6}
      strokeColor={strokeColor || 'var(--accent)'}
      style={{ position: 'absolute', top: '40vh', left: '50vw', zIndex: 3, ...style }}
    />
  );
};
