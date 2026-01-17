import { cn } from "@/components/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import slide1 from "@/login/assets/img/slide-1.png";
import slide2 from "@/login/assets/img/slide-2.png";
import slide3 from "@/login/assets/img/slide-3.png";
import { useI18n } from "@/login/i18n";

// Carousel data
const carouselSlides = [
  {
    titleKey: "carousel.slide1.title",
    descriptionKey: "carousel.slide1.description",
    image: slide1,
  },
  {
    titleKey: "carousel.slide2.title",
    descriptionKey: "carousel.slide2.description",
    image: slide2,
  },
  {
    titleKey: "carousel.slide3.title",
    descriptionKey: "carousel.slide3.description",
    image: slide3,
  },
];

export function CarouselWithDots() {
  const { advancedMsg } = useI18n();

  const plugin = useRef(Autoplay({ delay: 9000, stopOnInteraction: true }));
  const [current, setCurrent] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {carouselSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <div>
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-3/4 mx-auto "
                />
                <div className="text-center mt-10">
                  <p className="text-white text-2xl font-semibold">
                    {advancedMsg(slide.titleKey)}
                  </p>
                  <p className="text-white text-sm font-normal mt-2">
                    {advancedMsg(slide.descriptionKey)}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-10">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 rounded-full transition-all",
              current === index
                ? "w-8 bg-white"
                : "w-2 bg-slate-600 hover:bg-slate-500"
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}
