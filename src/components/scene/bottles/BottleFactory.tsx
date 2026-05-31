import React from 'react';
import { UnifiedLuxuryBottle } from './UnifiedLuxuryBottle';

interface BottleFactoryProps {
  id: string;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  isHovered?: boolean;
}

export const BottleFactory: React.FC<BottleFactoryProps> = ({
  id,
  position = [0, 0, 0],
  scale = 1.0,
  rotation = [0, 0, 0],
  isHovered = false,
}) => {
  return (
    <UnifiedLuxuryBottle
      id={id}
      position={position}
      scale={scale}
      rotation={rotation}
      isHovered={isHovered}
    />
  );
};
