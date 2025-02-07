import { motion } from 'framer-motion';
import { styles } from '../../utils/styles';

interface LoadingProps {
  message?: string;
  type?: 'hearts' | 'stars' | 'default';
}

export const Loading = ({ message = 'Loading...', type = 'hearts' }: LoadingProps) => {
  const items = type === 'hearts' ? ['❤️', '💖', '💝'] : 
                type === 'stars' ? ['⭐', '✨', '💫'] :
                ['●', '●', '●'];

  return (
    <div className={`${styles.layout.flexCenter} flex-col min-h-[200px]`}>
      <div className="flex space-x-2">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.2,
            }}
            className="text-2xl"
          >
            {item}
          </motion.div>
        ))}
      </div>
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-gray-600"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};
