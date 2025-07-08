import { useEffect, useState } from 'react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

interface ProcessImageOnMountProps {
  originalImageUrl: string;
  onProcessed: (processedUrl: string) => void;
  className?: string;
  alt: string;
}

const ProcessImageOnMount = ({ originalImageUrl, onProcessed, className, alt }: ProcessImageOnMountProps) => {
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processImage = async () => {
      try {
        const response = await fetch(originalImageUrl);
        const blob = await response.blob();
        const imageElement = await loadImage(blob);
        const processedBlob = await removeBackground(imageElement);
        const processedImageUrl = URL.createObjectURL(processedBlob);
        
        setProcessedUrl(processedImageUrl);
        onProcessed(processedImageUrl);
      } catch (error) {
        console.error('Failed to process image:', error);
        // Fallback to original image
        setProcessedUrl(originalImageUrl);
        onProcessed(originalImageUrl);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, [originalImageUrl, onProcessed]);

  if (isProcessing) {
    return (
      <div className={`${className} bg-primary/20 rounded-full animate-pulse flex items-center justify-center`}>
        <div className="w-4 h-4 bg-primary/40 rounded-full"></div>
      </div>
    );
  }

  return (
    <img 
      src={processedUrl || originalImageUrl}
      alt={alt}
      className={className}
    />
  );
};

export default ProcessImageOnMount;