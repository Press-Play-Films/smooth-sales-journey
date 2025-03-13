
/**
 * Types for video analysis service
 */

export type VideoAnalysisResult = {
  attentionScore: number;
  facingCamera: boolean;
  eyesVisible: boolean;
  movement: 'none' | 'low' | 'high';
};
