import { useTheme } from '../context/ThemeContext';

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <div className={`fixed bottom-0 left-0 right-0 p-4 text-center ${
      theme === 'dark' ? 'text-white/80' : 'text-gray-600'
    }`}>
      Made with ❤️ by{' '}
      <a
        href="https://eytta.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`font-medium hover:underline ${
          theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
        }`}
      >
        Eytta
      </a> technologies
    </div>
  );
};
