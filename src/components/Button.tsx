import { motion } from 'framer-motion';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'danger';
  disabled?: boolean;
}

export const Button = ({ onClick, children, variant = 'primary', disabled = false }: ButtonProps) => {
  const variants = {
    primary: 'bg-pink-500 hover:bg-pink-600',
    success: 'bg-green-500 hover:bg-green-600',
    danger: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} text-white font-bold py-3 px-6 rounded-full shadow-lg 
        transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </motion.button>
  );
};
