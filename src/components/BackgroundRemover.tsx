import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import { toast } from 'sonner';

interface BackgroundRemoverProps {
  originalImageUrl: string;
  onProcessed: (processedImageUrl: string) => void;
}

const BackgroundRemover = ({ originalImageUrl, onProcessed }: BackgroundRemoverProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveBackground = async () => {
    try {
      setIsProcessing(true);
      toast.info('Processing image... This may take a moment.');

      // Fetch the original image
      const response = await fetch(originalImageUrl);
      const blob = await response.blob();
      
      // Load image
      const imageElement = await loadImage(blob);
      
      // Remove background
      const processedBlob = await removeBackground(imageElement);
      
      // Create URL for the processed image
      const processedUrl = URL.createObjectURL(processedBlob);
      
      onProcessed(processedUrl);
      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to remove background. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button 
      onClick={handleRemoveBackground}
      disabled={isProcessing}
      size="sm"
      variant="outline"
    >
      {isProcessing ? 'Processing...' : 'Remove Background'}
    </Button>
  );
};

export default BackgroundRemover;