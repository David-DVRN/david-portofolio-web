"use client";

import { useEffect, useRef } from "react";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

export default function AudioVisualizer({ audioRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;

    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    // Retina display fix
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      const barWidth = canvas.clientWidth / bufferLength;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.clientHeight;

        // Gradient style
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight);
        gradient.addColorStop(0, "#00ffff");
        gradient.addColorStop(1, "#0044ff");
        ctx.fillStyle = gradient;

        ctx.fillRect(i * barWidth, canvas.clientHeight - barHeight, barWidth - 1, barHeight);
      }
    };

    audio.onplay = () => {
      audioCtx.resume().then(draw);
    };
  }, [audioRef]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-24"
    />
  );
}
