import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";

/**
 * Design System: Soft Modernism with Botanical Elegance
 * Gallery page showcasing user tributes
 */

interface Tribute {
  id: string;
  image: string;
  message: string;
  likes: number;
  timestamp: number;
}

interface GalleryProps {
  onBack: () => void;
}

export default function Gallery({ onBack }: GalleryProps) {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [likedTributes, setLikedTributes] = useState<Set<string>>(new Set());

  // Load tributes from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("womens_day_tributes");
    if (stored) {
      try {
        setTributes(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to load tributes:", error);
      }
    }
  }, []);

  const handleLike = (tributeId: string) => {
    const newLiked = new Set(likedTributes);
    if (newLiked.has(tributeId)) {
      newLiked.delete(tributeId);
    } else {
      newLiked.add(tributeId);
    }
    setLikedTributes(newLiked);

    // Update likes count
    setTributes(
      tributes.map((t) =>
        t.id === tributeId
          ? {
              ...t,
              likes: t.likes + (newLiked.has(tributeId) ? 1 : -1),
            }
          : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F3F0] via-[#F5F3F0] to-[#E8C4D8]">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-[#E8C4D8] z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-[#9B6B9E] hover:bg-[#F5F3F0]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold text-[#9B6B9E]">
            Tribute Gallery
          </h1>
        </div>
      </div>

      <main className="container max-w-6xl mx-auto px-4 py-12">
        {tributes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#A8B8A8] text-lg mb-4">
              No tributes yet. Be the first to celebrate your mother! 💜
            </p>
            <Button
              onClick={onBack}
              className="bg-[#9B6B9E] hover:bg-[#8B5B8E] text-white"
            >
              Create Your Tribute
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tributes.map((tribute, index) => (
              <div
                key={tribute.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-2 border-[#E8C4D8] hover:scale-105 duration-300 animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Tribute Image */}
                <div className="relative aspect-square overflow-hidden bg-[#F5F3F0]">
                  <img
                    src={tribute.image}
                    alt="Tribute"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Tribute Info */}
                <div className="p-4">
                  {/* Message */}
                  <p className="text-[#6B4C7A] text-sm mb-4 line-clamp-2 italic">
                    "{tribute.message}"
                  </p>

                  {/* Like Button */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLike(tribute.id)}
                      className="flex items-center gap-2 text-[#9B6B9E] hover:text-[#D4A5D4] transition-colors hover:scale-110 active:scale-95"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          likedTributes.has(tribute.id)
                            ? "fill-current"
                            : "stroke-current"
                        }`}
                      />
                      <span className="text-sm font-semibold">
                        {tribute.likes}
                      </span>
                    </button>

                    {/* Timestamp */}
                    <span className="text-xs text-[#A8B8A8]">
                      {new Date(tribute.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
