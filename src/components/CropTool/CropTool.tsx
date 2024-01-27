import 'cropperjs/dist/cropper.css';

import {useCallback, useRef} from 'react';
import Cropper, {ReactCropperElement} from 'react-cropper';

export const crop = (onCrop, cropper) => () => {
  if(onCrop) {
    const options = {
      fillColor: '#000',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high'
    };

    onCrop(cropper.getCroppedCanvas(options).toDataURL());
  }
};

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
  readonly alt?: string;
  readonly aspectRatio?: number;
  readonly className?: string;
  readonly crossOrigin?: CropOrigin;
  readonly imageUrl?: string;
  readonly initialAspectRatio?: number;
  readonly cropBoxMovable?: boolean;
  readonly cropBoxResizable?: boolean;
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
  readonly style?: any;
  readonly wheelZoomRatio?: number;
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
  readonly zoomable?: boolean;
  readonly zoomOnTouch?: boolean;
  readonly zoomOnWheel?: boolean;
}

export const CropTool = ({
  className,
  imageUrl,
  onCrop,
  style,
  ...restProps
}: CropToolProps) => {
  // References
  const imagRef = useRef<ReactCropperElement>(null);
  const handleCrop = useCallback(
    () => {
      const imageElement: any = imagRef.current;
      if(imageElement) {
        const cropper: any = imageElement?.cropper;
        return crop(onCrop, cropper);
      }

      return null;
    },
    [imagRef.current, onCrop]
  );

  return (
    <div style={style} className={className}>
      <Cropper
        src={imageUrl}
        style={{height: 500, width: '100%'}}
        guides={false}
        crop={handleCrop}
        ref={imagRef}
        {...restProps}
      />
    </div>
  );
};

export default CropTool;
