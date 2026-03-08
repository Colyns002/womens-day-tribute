import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { decorateImage } from "@/lib/canvasDecorator";

/**
 * Design System: Soft Modernism with Botanical Elegance
 * - Handles image decoration with canvas overlay
 * - Displays personal message input
 * - Provides download and share functionality
 */

interface TributePageProps {
  image: string;
  message: string;
  onMessageChange: (message: string) => void;
  onReset: () => void;
  onSaveToGallery?: (decoratedImage: string) => void;
}

export default function TributePage({
  image,
  message,
  onMessageChange,
  onReset,
  onSaveToGallery,
}: TributePageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [decoratedImage, setDecoratedImage] = useState<string | null>(null);
  const [isDecorating, setIsDecorating] = useState(true);

  // Decorate the image when component mounts or message changes
  useEffect(() => {
    const decorateAsync = async () => {
      setIsDecorating(true);
      try {
        const decorated = await decorateImage(image, message);
        setDecoratedImage(decorated);
      } catch (error) {
        console.error("Decoration error:", error);
        toast.error("Failed to decorate image");
      } finally {
        setIsDecorating(false);
      }
    };

    decorateAsync();
  }, [image, message]);

  const handleDownload = async () => {
    if (!decoratedImage) {
      toast.error("Image not ready yet");
      return;
    }

    try {
      // Save to gallery before download attempt
      if (onSaveToGallery) {
        onSaveToGallery(decoratedImage);
      }

      const response = await fetch(decoratedImage);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `womens-day-tribute-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Delay revoke to avoid race conditions in some browsers
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      toast.success("Image downloaded and saved to gallery!");
    } catch (error) {
      console.error("Download error:", error);
      window.open(decoratedImage, "_blank", "noopener,noreferrer");
      toast.error("Direct download failed. Opened image in new tab.");
    }
  };

  const handleShare = async () => {
    if (!decoratedImage) {
      toast.error("Image not ready yet");
      return;
    }

    try {
      // Convert data URL to blob
      const response = await fetch(decoratedImage);
      const blob = await response.blob();
      const file = new File([blob], "mothers-day-tribute.png", {
        type: "image/png",
      });

      // Check if Web Share API is available
      if (navigator.share) {
        await navigator.share({
          title: "Happy Women's Day",
          text: "Celebrating my mother on International Women's Day 💜",
          files: [file],
        });
        toast.success("Shared successfully!");
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(decoratedImage);
        toast.success("Image copied to clipboard!");
      }
    } catch (error) {
      console.error("Share error:", error);
      toast.error("Failed to share image");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F3F0] via-[#F5F3F0] to-[#E8C4D8]">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-[#E8C4D8] z-50">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            onClick={onReset}
            variant="ghost"
            className="text-[#9B6B9E] hover:bg-[#F5F3F0]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-xl font-semibold text-[#9B6B9E]">
            Create Your Tribute
          </h1>
          <div className="w-10" />
        </div>
      </div>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Preview */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-[#E8C4D8]">
              {isDecorating ? (
                <div className="aspect-square bg-gradient-to-br from-[#D4A5D4] to-[#E8C4D8] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#9B6B9E] mx-auto mb-2" />
                    <p className="text-[#9B6B9E] text-sm">Decorating your photo...</p>
                  </div>
                </div>
              ) : decoratedImage ? (
                <img
                  src={decoratedImage}
                  alt="Decorated tribute"
                  className="w-full h-auto rounded-xl"
                />
              ) : (
                <div className="aspect-square bg-[#F5F3F0] rounded-xl flex items-center justify-center">
                  <p className="text-[#A8B8A8]">Loading preview...</p>
                </div>
              )}
            </div>

            {/* Download and Share Buttons */}
            <div className="flex gap-3 mt-6 animate-slide-in-up">
              <Button
                onClick={handleDownload}
                disabled={isDecorating || !decoratedImage}
                className="flex-1 bg-[#9B6B9E] hover:bg-[#8B5B8E] text-white py-6 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                onClick={handleShare}
                disabled={isDecorating || !decoratedImage}
                className="flex-1 bg-[#A8B8A8] hover:bg-[#98A89A] text-white py-6 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Right: Message Input */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#E8C4D8] animate-fade-in-scale">
              <h2 className="text-2xl font-semibold text-[#9B6B9E] mb-4">
                Add Your Message
              </h2>
              <p className="text-[#6B4C7A] text-sm mb-4">
                Write a heartfelt message for your mother. It will appear on the final image in elegant typography.
              </p>

              <textarea
                value={message}
                onChange={(e) => onMessageChange(e.target.value)}
                placeholder="Thank you for everything, Mom..."
                className="w-full h-32 p-4 border-2 border-[#E8C4D8] rounded-xl focus:border-[#9B6B9E] focus:outline-none focus:ring-2 focus:ring-[#D4A5D4]/30 resize-none font-['Caveat'] text-lg text-[#2C2C2C] placeholder-[#A8B8A8]"
              />

              <div className="mt-6 bg-[#F5F3F0] rounded-xl p-4 animate-float">
                <h3 className="text-sm font-semibold text-[#9B6B9E] mb-3">
                  Message Preview
                </h3>
                <div className="text-center">
                  <p className="font-['Caveat'] text-2xl text-[#9B6B9E] min-h-12">
                    {message || "Your message will appear here..."}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 animate-slide-in-up">
                <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-[#A8B8A8] text-lg animate-float">✨</span>
                  <div>
                    <p className="font-semibold text-[#9B6B9E] text-sm">
                      Automatic Decorations
                    </p>
                    <p className="text-[#6B4C7A] text-xs">
                      Floral doodles, hearts, sparkles, and a "Happy Women's Day" badge
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-[#A8B8A8] text-lg animate-float" style={{ animationDelay: "0.2s" }}>🎎</span>
                  <div>
                    <p className="font-semibold text-[#9B6B9E] text-sm">
                      Elegant Design
                    </p>
                    <p className="text-[#6B4C7A] text-xs">
                      Soft colors and refined typography celebrate your mother
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Hidden canvas for decoration */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
