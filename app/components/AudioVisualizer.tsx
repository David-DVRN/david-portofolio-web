"use client";

import { useEffect, useRef } from "react";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

export default function AudioVisualizer({ audioRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);

    const handlePlay = async () => {
      if (!audioCtxRef.current) {
        const audioCtx = new AudioContext();
        await audioCtx.resume();
        audioCtxRef.current = audioCtx;

        const source = audioCtx.createMediaElementSource(audio);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;

        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        sourceRef.current = source;
        analyserRef.current = analyser;
      }

      const analyser = analyserRef.current;
      if (!analyser) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        const barWidth = canvas.clientWidth / bufferLength;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.clientHeight;
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight);
          gradient.addColorStop(0, "#00ffff");
          gradient.addColorStop(1, "#0044ff");
          ctx.fillStyle = gradient;

          ctx.fillRect(i * barWidth, canvas.clientHeight - barHeight, barWidth - 1, barHeight);
        }
      };

      draw();
    };

    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("play", handlePlay);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
        sourceRef.current = null;
        analyserRef.current = null;
      }
    };
  }, [audioRef]);

  return <canvas ref={canvasRef} className="w-full h-24" />;
}