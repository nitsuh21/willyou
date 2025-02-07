export const styles = {
  // Common button styles
  button: {
    base: 'font-bold py-3 px-8 rounded-full shadow-lg transform transition',
    primary: 'bg-pink-500 hover:bg-pink-600 text-white hover:scale-105',
    secondary: 'bg-purple-500 hover:bg-purple-600 text-white hover:scale-105',
    success: 'bg-green-500 hover:bg-green-600 text-white hover:scale-105',
    danger: 'bg-red-500 hover:bg-red-600 text-white hover:scale-105',
    outline: 'border-2 border-pink-500 text-pink-500 hover:bg-pink-50',
  },

  // Card styles
  card: {
    base: 'rounded-xl shadow-lg overflow-hidden transition-all duration-300',
    hover: 'hover:shadow-2xl hover:-translate-y-2',
    gradient: {
      valentine: 'bg-gradient-to-br from-red-400 to-pink-500',
      proposal: 'bg-gradient-to-br from-purple-400 to-pink-500',
      anniversary: 'bg-gradient-to-br from-blue-400 to-purple-500',
      birthday: 'bg-gradient-to-br from-yellow-400 to-red-500',
      date: 'bg-gradient-to-br from-green-400 to-blue-500',
    },
  },

  // Container styles
  container: {
    base: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    narrow: 'max-w-3xl mx-auto px-4 sm:px-6',
    wide: 'max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8',
  },

  // Background patterns
  patterns: {
    hearts: `background-image: url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ff69b4' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`,
    stars: `background-image: url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ffd700' d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E")`,
    confetti: `background-image: url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ff69b4' d='M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z'/%3E%3C/svg%3E")`,
  },

  // Text styles
  text: {
    heading: {
      h1: 'text-4xl font-bold sm:text-5xl md:text-6xl',
      h2: 'text-3xl font-bold sm:text-4xl',
      h3: 'text-2xl font-bold sm:text-3xl',
      h4: 'text-xl font-bold sm:text-2xl',
    },
    gradient: {
      pink: 'bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500',
      blue: 'bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500',
      gold: 'bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-500',
    },
  },

  // Form styles
  form: {
    input: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500',
    select: 'w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500',
    label: 'block text-sm font-medium text-gray-700 mb-1',
    error: 'text-red-500 text-sm mt-1',
  },

  // Animation classes
  animation: {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
  },

  // Layout utilities
  layout: {
    flexCenter: 'flex justify-center items-center',
    flexBetween: 'flex justify-between items-center',
    flexColumn: 'flex flex-col',
    grid: {
      base: 'grid gap-6',
      cols2: 'grid-cols-1 md:grid-cols-2',
      cols3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      cols4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    },
  },
};
