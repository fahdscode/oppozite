import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  layoutId?: string;
  selectedImage?: string | null;
}

export const ImageGallery = ({ images, productName, layoutId, selectedImage }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  // Update selected index when selectedImage prop changes
  useEffect(() => {
    if (selectedImage) {
      const index = images.findIndex(img => img === selectedImage);
      if (index !== -1) {
        setDirection(index > selectedIndex ? 1 : -1);
        setSelectedIndex(index);
        api?.scrollTo(index);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  // Sync carousel with internal selection changes
  useEffect(() => {
    if (api) {
      api.scrollTo(selectedIndex);
    }
  }, [selectedIndex, api]);

  const handleNext = () => {
    setDirection(1);
    const nextIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(nextIndex);
  };

  const handlePrev = () => {
    setDirection(-1);
    const prevIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedIndex(prevIndex);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const isSharedTransition = isFirstRender.current && selectedIndex === 0 && layoutId;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-[3/4] bg-secondary overflow-hidden">
        <AnimatePresence initial={!isSharedTransition} custom={direction} mode="wait">
          <motion.img
            key={selectedIndex}
            layoutId={selectedIndex === 0 && layoutId ? layoutId : undefined}
            src={images[selectedIndex]}
            alt={productName}
            className="absolute inset-0 w-full h-full object-cover"
            custom={direction}
            variants={slideVariants}
            initial={isSharedTransition ? { opacity: 1, x: 0 } : "enter"}
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <motion.button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 text-sm font-medium rounded-full">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Carousel */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 pb-1">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-3 basis-1/5 sm:basis-1/6">
              <motion.button
                onClick={() => {
                  setDirection(index > selectedIndex ? 1 : -1);
                  setSelectedIndex(index);
                }}
                className={`w-full aspect-[3/4] border-2 transition-all duration-300 ${selectedIndex === index
                  ? "border-foreground"
                  : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image}
                  alt={`${productName} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
