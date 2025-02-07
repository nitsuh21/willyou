declare namespace YT {
  interface Player {
    playVideo(): void;
    pauseVideo(): void;
    mute(): void;
    unMute(): void;
    destroy(): void;
  }

  interface PlayerEvent {
    target: Player;
    data: number;
  }

  interface PlayerOptions {
    height?: string | number;
    width?: string | number;
    videoId?: string;
    playerVars?: {
      autoplay?: 0 | 1;
      controls?: 0 | 1;
      disablekb?: 0 | 1;
      fs?: 0 | 1;
      modestbranding?: 0 | 1;
    };
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: PlayerEvent) => void;
    };
  }

  const enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5
  }

  function Player(
    element: HTMLElement | string,
    options: PlayerOptions
  ): Player;
}
