import React from 'react';
import { Composition } from 'remotion';
import { EditorReplica } from './EditorReplica';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="EditorReplica"
      component={EditorReplica}
      durationInFrames={900}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
