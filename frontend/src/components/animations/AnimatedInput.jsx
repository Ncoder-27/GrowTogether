'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedInput = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  error,
  touched,
  className = '',
  required = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const hasError = touched && error;
  const isPopulated = value && value.length > 0;

  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <motion.label
          htmlFor={id}
          className={`block text-sm font-medium mb-1 ${
            hasError ? 'text-red-600' : 'text-gray-700'
          }`}
          initial={{ y: 0 }}
          animate={{ 
            y: 0,
            color: hasError ? '#DC2626' : isFocused ? '#EA580C' : '#374151'
          }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}

      <div className="relative">
        <motion.input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${
            hasError
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
          }`}
          animate={{
            borderColor: hasError 
              ? '#FCA5A5' 
              : isFocused 
                ? '#FB923C' 
                : '#D1D5DB',
            boxShadow: isFocused 
              ? hasError 
                ? '0 0 0 3px rgba(252, 165, 165, 0.2)' 
                : '0 0 0 3px rgba(251, 146, 60, 0.2)' 
              : 'none'
          }}
          transition={{ duration: 0.2 }}
          {...props}
        />

        {type === 'password' && (
          <motion.div 
            className="absolute inset-y-0 right-3 flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Password toggle icon could go here */}
          </motion.div>
        )}
      </div>

      {hasError && (
        <motion.p 
          className="mt-1 text-sm text-red-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedInput; 