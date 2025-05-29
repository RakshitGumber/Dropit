import { motion } from "framer-motion";

export const Screen = ({
  setAnimationCompleted,
}: {
  setAnimationCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100vh" }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
    >
      <motion.div
        className="w-16 h-16 bg-white rounded-full text-black flex items-center justify-center"
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 1~,
          ease: "easeInOut",
        }}
        onAnimationComplete={() => {
          setAnimationCompleted(true);
        }}
      >
        <h1>Hello</h1>
      </motion.div>
    </motion.div>
  );
};
