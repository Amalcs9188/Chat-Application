'use client';
import { AiOutlineUser } from "react-icons/ai";
import { motion } from 'framer-motion';

const ProfileComponent = ({ className }: { className?: string }) => {
  return (
    <motion.div whileTap={{ scale: 0.9 }}>
      <AiOutlineUser size={40} className={` Header_icon ${className}`} />
    </motion.div>
  );
};

export default ProfileComponent;
