import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface MusicPlayerProps {
  url: string;
  startTime?: string;
}

export const MusicPlayer = ({ url, startTime = '0' }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isYTReady, setIsYTReady] = useState(false);
  const playerRef = useRef<any>(null);

  const getStartTimeInSeconds = (time: string): number => {
    // If it's already in seconds, just return it
    if (!isNaN(Number(time))) {
      return Number(time);
    }
    
    // Try to parse mm:ss format
    try {
      const [minutes, seconds] = time.split(':').map(num => parseInt(num) || 0);
      return (minutes * 60) + seconds;
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsYTReady(true);
      };
    } else {
      setIsYTReady(true);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (isYTReady && url) {
      initializePlayer(url);
    }
  }, [isYTReady, url]);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const initializePlayer = (songUrl: string) => {
    const videoId = extractVideoId(songUrl);
    if (!videoId) return;

    if (playerRef.current) {
      playerRef.current.destroy();
    }

    const startTimeInSeconds = getStartTimeInSeconds(startTime);

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        start: startTimeInSeconds,
      },
      events: {
        onReady: (event: any) => {
          event.target.playVideo();
          event.target.seekTo(startTimeInSeconds);
          setIsPlaying(true);
          if (isMuted) {
            event.target.mute();
          }
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            event.target.playVideo();
          }
        },
      },
    });
  };

  const togglePlay = () => {
    if (!url || !playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex items-center gap-2">
      <div id="youtube-player" />
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </motion.button>
      <motion.button
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20"
      >
        {isMuted ? <FiVolumeX className="w-5 h-5" /> : <FiVolume2 className="w-5 h-5" />}
      </motion.button>
    </div>
  );
};
