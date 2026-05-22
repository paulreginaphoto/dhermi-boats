"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { assetPath } from "@/lib/site";

const videoSrc = assetPath("/videos/dhermi-sea-moments.mp4");
const posterSrc = assetPath("/images/gallery-blue-cove-boat.webp");

export function VideoFeature() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLoadedSourceRef = useRef(false);
  const [canLoad, setCanLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setCanLoad(true);
        if (!reduceMotion) {
          setIsPlaying(true);
        }
        observer.disconnect();
      },
      { rootMargin: "220px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canLoad) return;

    if (!hasLoadedSourceRef.current) {
      video.load();
      hasLoadedSourceRef.current = true;
    }

    if (isPlaying) {
      const playWhenReady = () => {
        void video
          .play()
          .then(() => {
            if (video.paused) {
              setIsPlaying(false);
            }
          })
          .catch(() => setIsPlaying(false));
      };

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        playWhenReady();
      } else {
        video.addEventListener("canplay", playWhenReady, { once: true });
      }

      return () => video.removeEventListener("canplay", playWhenReady);
    }

    video.pause();
  }, [canLoad, isPlaying]);

  return (
    <div className="relative mx-auto aspect-[9/16] max-h-[620px] w-full max-w-[390px] overflow-hidden rounded-lg border border-ink/10 bg-navy shadow-image">
      <video
        ref={videoRef}
        aria-label="Short video from a Dhermi Boat sea cave tour"
        className="h-full w-full object-cover"
        loop
        muted
        playsInline
        poster={posterSrc}
        preload="none"
        onPause={() => setIsPlaying(false)}
        onPlaying={() => setIsPlaying(true)}
      >
        {canLoad ? <source src={videoSrc} type="video/mp4" /> : null}
      </video>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy/55 to-transparent" />
      <button
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-navy/70 text-pearl shadow-soft backdrop-blur transition hover:bg-navy active:scale-95"
        type="button"
        onClick={() => {
          setCanLoad(true);
          setIsPlaying((value) => !value);
        }}
      >
        {isPlaying ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
      </button>
    </div>
  );
}
