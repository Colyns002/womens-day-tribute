import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download, Share2, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import TributePage from "./TributePage";
import Gallery from "./Gallery";

/**
 * Design System: Soft Modernism with Botanical Elegance
 * - Color: Deep Mauve (#9B6B9E), Soft Purple (#D4A5D4), Sage Green (#A8B8A8), Cream (#F5F3F0)
 * - Typography: Playfair Display for headlines, Inter for body, Caveat for handwritten text
 * - Layout: Asymmetric, flowing composition with organic dividers
 * - Animations: Gentle floating, soft fade-ins, smooth transitions
 */

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [personalMessage, setPersonalMessage] = useState("");
  const [showGallery, setShowGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (JPG or PNG)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setUploadedImage(result);
      toast.success("Photo uploaded! Now add your message.");
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setPersonalMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const saveTributeToGallery = (decoratedImage: string) => {
    const tribute = {
      id: Date.now().toString(),
      image: decoratedImage,
      message: personalMessage,
      likes: 0,
      timestamp: Date.now(),
    };

    const stored = localStorage.getItem("womens_day_tributes");
    const tributes = stored ? JSON.parse(stored) : [];
    tributes.unshift(tribute);
    localStorage.setItem("womens_day_tributes", JSON.stringify(tributes.slice(0, 50)));
  };

  // Show gallery if requested
  if (showGallery) {
    return <Gallery onBack={() => setShowGallery(false)} />;
  }

  // Show tribute page if image is uploaded
  if (uploadedImage) {
    return (
      <TributePage
        image={uploadedImage}
        message={personalMessage}
        onMessageChange={setPersonalMessage}
        onReset={handleReset}
        onSaveToGallery={saveTributeToGallery}
      />
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F3F0] via-[#F5F3F0] to-[#E8C4D8] overflow-hidden">
      {/* Decorative SVG divider at top */}
      <svg
        className="w-full h-auto"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#9B6B9E", stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: "#D4A5D4", stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>
        <path
          d="M0,50 Q300,100 600,50 T1200,50 L1200,200 L0,200 Z"
          fill="url(#dividerGradient)"
        />
      </svg>

      <main className="container max-w-2xl mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl md:text-6xl font-bold text-[#9B6B9E] mb-4 leading-tight">
            Celebrate Your Mother Today
          </h1>
          <p className="text-lg md:text-xl text-[#6B4C7A] mb-8 leading-relaxed max-w-lg mx-auto">
            Upload your mother's photo and create a beautiful Women's Day tribute. Decorate it with elegant doodles, add a personal message, and share the love.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-12 border-2 border-[#E8C4D8] hover:shadow-xl transition-shadow duration-300 animate-fade-in-scale">
          {/* Upload Illustration */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#D4A5D4] to-[#E8C4D8] flex items-center justify-center shadow-md animate-float">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663329213798/FD7T5J5BKiPznam95gUq3P/upload-illustration-Ue3ZPCnGk9xokbRv7yK4oh.webp"
                alt="Upload illustration"
                className="w-24 h-24 md:w-32 md:h-32"
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#9B6B9E] mb-2">
              Upload Your Photo
            </h2>
            <p className="text-[#6B4C7A] mb-4">
              Supported formats: JPG, PNG (Max 5MB)
            </p>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageUpload}
            className="hidden"
            aria-label="Upload photo"
          />

          {/* Upload Button */}
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-[#9B6B9E] hover:bg-[#8B5B8E] text-white py-6 text-lg rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Photo
            </Button>
            <p className="text-sm text-[#A8B8A8] text-center">
              Drag and drop your photo to get started
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-slide-in-up">
          <div className="bg-white rounded-2xl p-6 border border-[#E8C4D8] hover:border-[#D4A5D4] transition-colors hover:shadow-md hover:scale-105 duration-300">
            <div className="w-12 h-12 bg-[#D4A5D4] rounded-full flex items-center justify-center mb-4 animate-float">
              <span className="text-xl">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-[#9B6B9E] mb-2">Auto Decoration</h3>
            <p className="text-sm text-[#6B4C7A]">
              Beautiful floral doodles and sparkles are automatically added to your photo
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E8C4D8] hover:border-[#D4A5D4] transition-colors hover:shadow-md hover:scale-105 duration-300">
            <div className="w-12 h-12 bg-[#A8B8A8] rounded-full flex items-center justify-center mb-4 animate-float" style={{ animationDelay: "0.2s" }}>
              <span className="text-xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-[#9B6B9E] mb-2">Personal Message</h3>
            <p className="text-sm text-[#6B4C7A]">
              Add a heartfelt message that appears on the final image in elegant typography
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E8C4D8] hover:border-[#D4A5D4] transition-colors hover:shadow-md hover:scale-105 duration-300">
            <div className="w-12 h-12 bg-[#E8C4D8] rounded-full flex items-center justify-center mb-4 animate-float" style={{ animationDelay: "0.4s" }}>
              <span className="text-xl">📥</span>
            </div>
            <h3 className="text-lg font-semibold text-[#9B6B9E] mb-2">Download & Share</h3>
            <p className="text-sm text-[#6B4C7A]">
              Download your tribute or share it directly on social media
            </p>
          </div>
        </div>

        {/* Gallery Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setShowGallery(true)}
            variant="outline"
            className="border-2 border-[#9B6B9E] text-[#9B6B9E] hover:bg-[#F5F3F0]"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            View Tribute Gallery
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-[#A8B8A8] text-sm">
          <p>Celebrate the women who inspire us every day 💜</p>
        </div>
      </main>

      {/* Decorative SVG divider at bottom */}
      <svg
        className="w-full h-auto mt-12"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dividerGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#D4A5D4", stopOpacity: 0.05 }} />
            <stop offset="100%" style={{ stopColor: "#9B6B9E", stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        <path
          d="M0,150 Q300,100 600,150 T1200,150 L1200,0 L0,0 Z"
          fill="url(#dividerGradient2)"
        />
      </svg>
    </div>
  );
}
