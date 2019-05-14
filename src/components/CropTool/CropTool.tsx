import './cropper.css';

import Cropper from 'cropperjs';
import React, {useEffect, useRef} from 'react';

import {CropToolProps} from './CropTool.types';

const optionProps: string[] = [
  'dragMode',
  'aspectRatio',
  'data',
  'crop',
  // unchangeable props start from here
  'viewMode',
  'preview',
  'responsive',
  'restore',
  'checkCrossOrigin',
  'checkOrientation',
  'modal',
  'guides',
  'center',
  'highlight',
  'background',
  'autoCrop',
  'autoCropArea',
  'movable',
  'rotatable',
  'scalable',
  'zoomable',
  'zoomOnTouch',
  'zoomOnWheel',
  'wheelZoomRatio',
  'cropBoxMovable',
  'cropBoxResizable',
  'toggleDragModeOnDblclick',
  'minContainerWidth',
  'minContainerHeight',
  'minCanvasWidth',
  'minCanvasHeight',
  'minCropBoxWidth',
  'minCropBoxHeight',
  'ready',
  'cropstart',
  'cropmove',
  'cropend',
  'zoom'
];

export const crop = (props, cropper) => () => {
  const {onCrop} = props;

  if(onCrop) {
    const options = {
      fillColor: '#000',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high'
    };

    onCrop(cropper.getCroppedCanvas(options).toDataURL());
  }
};

export const CropTool = (props: CropToolProps) => {
  const {
    alt,
    className,
    crossOrigin = '',
    src,
    style
  } = props;
  let cropper: Cropper;

  // References
  const image = useRef();

  // Mount
  useEffect(() => {
    const options: any = Object.keys(props)
      .filter((key: string) => optionProps.indexOf(key) !== -1)
      .reduce((prevOptions, key: string) => ({...prevOptions, [key]: props[key]}), {});

    const currentImage: any = image.current;
    cropper = new Cropper(currentImage, options);
    currentImage.addEventListener('crop', crop(props, cropper));
    currentImage.addEventListener('zoom', crop(props, cropper));

    // Unmount
    return () => {
      if(currentImage) {
        currentImage.addEventListener('crop', crop(props, cropper));
        currentImage.addEventListener('zoom', crop(props, cropper));
        cropper.destroy();
      }
    };
  }, []);

  // useEffect(() => {
  //   cropper.reset().clear().replace(src);

  //   if(aspectRatio) {
  //     cropper.setAspectRatio(aspectRatio);
  //   }
  //   if(data) {
  //     cropper.setData(data);
  //   }
  //   if(cropBoxData) {
  //     cropper.setCropBoxData(cropBoxData);
  //   }
  //   if(canvasData) {
  //     cropper.setCanvasData(canvasData);
  //   }
  //   if(moveTo) {
  //     cropper.moveTo(moveTo[0], moveTo[1]);
  //   }
  //   if(zoomTo) {
  //     cropper.zoomTo(zoomTo);
  //   }
  // }, [src]);
  // useEffect(() => {
  //   if(isLoaded) {
  //     cropper.setAspectRatio(aspectRatio);
  //   }
  // }, [aspectRatio]);
  // useEffect(() => {
  //   if(isLoaded) {
  //     cropper.setData(data);
  //   }
  // }, [data]);
  // useEffect(() => {
  //   if(isLoaded) {
  //     cropper.setDragMode(dragMode as any);
  //   }
  // }, [dragMode]);
  // useEffect(() => {
  //   if(isLoaded) {
  //     cropper.setCropBoxData(cropBoxData);
  //   }
  // }, [cropBoxData]);
  // useEffect(() => {
  //   if(isLoaded) {
  //     cropper.setCanvasData(canvasData);
  //   }
  // }, [canvasData]);
  // useEffect(() => {
  //   if(isLoaded) {
  //     cropper.moveTo(moveTo[0], moveTo[1]);
  //   }
  // }, [moveTo]);
  // useEffect(() => {
  //   if(isLoaded) {
  //     cropper.zoomTo(zoomTo);
  //   }
  // }, [zoomTo]);
  // useEffect(() => {
  //   if(isLoaded) {
  //     cropper.rotateTo(rotateTo);
  //   }
  // }, [rotateTo]);
  // useEffect(() => {
  //   if(isLoaded) {
  //     cropper.scaleX(scaleX);
  //   }
  // }, [scaleX]);
  // useEffect(() => {
  //   if(isLoaded) {
  //     cropper.scaleY(scaleY);
  //   }
  // }, [scaleY]);
  // useEffect(() => {
  //   if(isLoaded) {
  //     if(enable) {
  //       cropper.enable();
  //     } else {
  //       cropper.disable();
  //     }
  //   }
  // }, [enable]);

  return (
    <div style={style} className={className}>
      <img
        alt={alt === undefined ? 'picture' : alt}
        crossOrigin={crossOrigin}
        ref={image}
        src={src}
        style={{opacity: 0}} />
    </div>
  );
};

export default CropTool;
