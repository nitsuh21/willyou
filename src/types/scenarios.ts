export type ScenarioType = 'valentine' | 'proposal' | 'anniversary' | 'birthday' | 'date';

export interface AvatarStyle {
  bodyColor: string;
  hairColor: string;
  hairStyle: 'short' | 'long' | 'wavy' | 'curly';
  outfit: 'casual' | 'formal' | 'fancy' | 'party';
  accessories?: 'glasses' | 'hat' | 'bowtie' | 'necklace';
}

export interface ScenarioData {
  id: ScenarioType;
  title: string;
  description: string;
  image: string;
  color: string;
  defaultStyles: {
    asker: AvatarStyle;
    receiver: AvatarStyle;
  };
  animations: {
    asker: string[];
    receiver: string[];
  };
  music: {
    url: string;
    title: string;
  }[];
}

export const SCENARIOS: Record<ScenarioType, ScenarioData> = {
  valentine: {
    id: 'valentine',
    title: "Valentine's Day",
    description: 'Express your love in a magical way',
    image: '/images/valentine.jpg',
    color: 'from-red-400 to-pink-500',
    defaultStyles: {
      asker: {
        bodyColor: 'bg-blue-500',
        hairColor: 'bg-gray-800',
        hairStyle: 'short',
        outfit: 'formal',
      },
      receiver: {
        bodyColor: 'bg-pink-500',
        hairColor: 'bg-yellow-600',
        hairStyle: 'long',
        outfit: 'fancy',
      },
    },
    animations: {
      asker: ['entrance', 'kneel', 'giveRoses', 'jump', 'dance'],
      receiver: ['entrance', 'surprise', 'blush', 'jump', 'dance'],
    },
    music: [
      { url: '/music/romantic-1.mp3', title: 'Romantic Melody' },
      { url: '/music/romantic-2.mp3', title: 'Love Theme' },
    ],
  },
  proposal: {
    id: 'proposal',
    title: 'Marriage Proposal',
    description: 'Make your proposal unforgettable',
    image: '/images/proposal.jpg',
    color: 'from-purple-400 to-pink-500',
    defaultStyles: {
      asker: {
        bodyColor: 'bg-gray-800',
        hairColor: 'bg-brown-600',
        hairStyle: 'short',
        outfit: 'formal',
        accessories: 'bowtie',
      },
      receiver: {
        bodyColor: 'bg-pink-500',
        hairColor: 'bg-yellow-600',
        hairStyle: 'long',
        outfit: 'fancy',
        accessories: 'necklace',
      },
    },
    animations: {
      asker: ['entrance', 'kneel', 'showRing', 'hug', 'kiss'],
      receiver: ['entrance', 'gasp', 'cry', 'hug', 'kiss'],
    },
    music: [
      { url: '/music/proposal-1.mp3', title: 'Perfect Moment' },
      { url: '/music/proposal-2.mp3', title: 'Wedding Bells' },
    ],
  },
  anniversary: {
    id: 'anniversary',
    title: 'Anniversary',
    description: 'Celebrate your special moments',
    image: '/images/anniversary.jpg',
    color: 'from-blue-400 to-purple-500',
    defaultStyles: {
      asker: {
        bodyColor: 'bg-blue-600',
        hairColor: 'bg-gray-800',
        hairStyle: 'short',
        outfit: 'party',
      },
      receiver: {
        bodyColor: 'bg-purple-500',
        hairColor: 'bg-brown-600',
        hairStyle: 'wavy',
        outfit: 'party',
      },
    },
    animations: {
      asker: ['entrance', 'toast', 'dance', 'twirl', 'kiss'],
      receiver: ['entrance', 'toast', 'dance', 'twirl', 'kiss'],
    },
    music: [
      { url: '/music/anniversary-1.mp3', title: 'Years Together' },
      { url: '/music/anniversary-2.mp3', title: 'Sweet Memories' },
    ],
  },
  birthday: {
    id: 'birthday',
    title: 'Birthday Surprise',
    description: 'Make their birthday extra special',
    image: '/images/birthday.jpg',
    color: 'from-yellow-400 to-red-500',
    defaultStyles: {
      asker: {
        bodyColor: 'bg-blue-500',
        hairColor: 'bg-brown-600',
        hairStyle: 'short',
        outfit: 'party',
        accessories: 'hat',
      },
      receiver: {
        bodyColor: 'bg-pink-500',
        hairColor: 'bg-yellow-600',
        hairStyle: 'curly',
        outfit: 'party',
        accessories: 'hat',
      },
    },
    animations: {
      asker: ['entrance', 'holdCake', 'sing', 'celebrate', 'dance'],
      receiver: ['entrance', 'surprise', 'blowCandles', 'celebrate', 'dance'],
    },
    music: [
      { url: '/music/birthday-1.mp3', title: 'Happy Birthday' },
      { url: '/music/birthday-2.mp3', title: 'Celebration' },
    ],
  },
  date: {
    id: 'date',
    title: 'Date Invitation',
    description: 'Ask them out in a special way',
    image: '/images/date.jpg',
    color: 'from-green-400 to-blue-500',
    defaultStyles: {
      asker: {
        bodyColor: 'bg-blue-500',
        hairColor: 'bg-gray-800',
        hairStyle: 'short',
        outfit: 'casual',
      },
      receiver: {
        bodyColor: 'bg-pink-500',
        hairColor: 'bg-red-700',
        hairStyle: 'wavy',
        outfit: 'casual',
      },
    },
    animations: {
      asker: ['entrance', 'wave', 'showTickets', 'walk', 'smile'],
      receiver: ['entrance', 'wave', 'excited', 'walk', 'smile'],
    },
    music: [
      { url: '/music/date-1.mp3', title: 'First Date' },
      { url: '/music/date-2.mp3', title: 'Sweet Meeting' },
    ],
  },
};
