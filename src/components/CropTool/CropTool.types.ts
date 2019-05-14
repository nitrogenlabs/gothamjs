export type CropDragMode = 'crop' | 'move' | 'none';
export type CropViewMode = 0 | 1 | 2 | 3;
export type CropOrigin = '' | 'anonymous' | 'use-credentials';
export interface CropData {
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly rotate?: number;
  readonly scaleX?: number;
  readonly scaleY?: number;
}
export interface CropBoxData {
  readonly left?: number,
  readonly top?: number,
  readonly width?: number,
  readonly height?: number,
}

export interface CropToolProps {
  readonly style?: any;
  readonly className?: string;
  readonly crossOrigin?: CropOrigin;
  readonly src?: string;
  readonly alt?: string;
  readonly aspectRatio?: number;
  readonly dragMode?: CropDragMode;
  readonly data?: CropData;
  readonly scaleX?: number;
  readonly scaleY?: number;
  readonly enable?: boolean;
  readonly cropBoxData?: CropBoxData;
  readonly canvasData?: CropBoxData;
  readonly zoomTo?: number;
  readonly moveTo?: number[];
  readonly rotateTo?: number;
  readonly viewMode?: CropViewMode;
  readonly preview?: string;
  readonly responsive?: boolean;
  readonly restore?: boolean;
  readonly checkCrossOrigin?: boolean;
  readonly checkOrientation?: boolean;
  readonly modal?: boolean;
  readonly guides?: boolean;
  readonly center?: boolean;
  readonly highlight?: boolean;
  readonly background?: boolean;
  readonly autoCrop?: boolean;
  readonly autoCropArea?: number;
  readonly movable?: boolean;
  readonly rotatable?: boolean;
  readonly scalable?: boolean;
  readonly zoomable?: boolean;
  readonly zoomOnTouch?: boolean;
  readonly zoomOnWheel?: boolean;
  readonly wheelZoomRatio?: number;
  readonly cropBoxMovable?: boolean;
  readonly cropBoxResizable?: boolean;
  readonly toggleDragModeOnDblclick?: boolean;
  readonly minContainerWidth?: number;
  readonly minContainerHeight?: number;
  readonly minCanvasWidth?: number;
  readonly minCanvasHeight?: number;
  readonly minCropBoxWidth?: number;
  readonly minCropBoxHeight?: number;
  readonly ready?: () => any;
  readonly cropstart?: () => any;
  readonly cropmove?: () => any;
  readonly cropend?: () => any;
  readonly onCrop?: (base64: string) => any;
  readonly zoom?: () => any;
}
