import { gsap } from 'gsap';

export const animations = {
  // Background effects
  floatingHearts: (container: HTMLElement) => {
    const hearts = container.querySelectorAll('.floating-heart');
    hearts.forEach((heart) => {
      gsap.to(heart, {
        y: '-100vh',
        x: 'random(-50, 50)',
        rotation: 'random(-180, 180)',
        duration: 'random(3, 6)',
        repeat: -1,
        ease: 'none',
        delay: 'random(0, -5)',
      });
    });
  },

  // Scene transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },

  // Text animations
  textReveal: {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  },

  // Button effects
  buttonHover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },

  buttonTap: {
    scale: 0.95,
  },

  // Card animations
  cardHover: {
    scale: 1.05,
    y: -10,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },

  // Particle effects
  createParticles: (container: HTMLElement, type: 'hearts' | 'confetti' | 'stars') => {
    const particles = [];
    const particleCount = 20;
    const emojis = {
      hearts: ['❤️', '💖', '💝', '💕'],
      confetti: ['🎉', '✨', '🎊', '🌟'],
      stars: ['⭐', '🌟', '✨', '💫'],
    };

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.textContent = emojis[type][Math.floor(Math.random() * emojis[type].length)];
      particle.style.position = 'absolute';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = '100%';
      particle.style.fontSize = `${Math.random() * 20 + 10}px`;
      container.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        y: '-100vh',
        x: `random(-50, 50)`,
        rotation: 'random(-180, 180)',
        duration: 'random(2, 4)',
        ease: 'power1.out',
        onComplete: () => {
          container.removeChild(particle);
        },
      });
    }
  },

  // Scene-specific animations
  valentine: {
    roseEntrance: (element: HTMLElement) => {
      gsap.from(element, {
        scale: 0,
        rotation: 720,
        duration: 1,
        ease: 'back.out',
      });
    },
    heartBeat: (element: HTMLElement) => {
      gsap.to(element, {
        scale: 1.2,
        duration: 0.2,
        repeat: 1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    },
  },

  proposal: {
    ringSparkle: (element: HTMLElement) => {
      gsap.to(element, {
        scale: 1.2,
        filter: 'brightness(1.5)',
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      });
    },
    kneelDown: (element: HTMLElement) => {
      gsap.to(element, {
        rotateZ: -90,
        y: '+=50',
        duration: 1,
        ease: 'power2.inOut',
      });
    },
  },

  birthday: {
    candleFlicker: (element: HTMLElement) => {
      gsap.to(element, {
        opacity: 'random(0.5, 1)',
        duration: 'random(0.2, 0.5)',
        repeat: -1,
        yoyo: true,
      });
    },
    blowCandles: (element: HTMLElement) => {
      gsap.to(element, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
      });
    },
  },

  anniversary: {
    toastClink: (elements: HTMLElement[]) => {
      gsap.to(elements, {
        rotation: 20,
        duration: 0.2,
        stagger: 0.1,
        repeat: 1,
        yoyo: true,
      });
    },
    danceMove: (element: HTMLElement) => {
      gsap.to(element, {
        x: 10,
        rotation: 5,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
  },

  date: {
    walkTogether: (elements: HTMLElement[]) => {
      gsap.to(elements, {
        x: '+=50',
        duration: 1,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    },
    showTickets: (element: HTMLElement) => {
      gsap.from(element, {
        y: 50,
        rotation: -45,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out',
      });
    },
  },
};
