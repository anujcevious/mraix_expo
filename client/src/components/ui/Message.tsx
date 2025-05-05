
import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

export type MessageType = 'success' | 'error' | 'warning';

interface MessageProps {
  type: MessageType;
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Message: React.FC<MessageProps> = ({ type, message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const icons = {
    success: <FiCheckCircle className="text-green-500" size={20} />,
    error: <FiXCircle className="text-red-500" size={20} />,
    warning: <FiAlertCircle className="text-yellow-500" size={20} />
  };

  const colors = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 animate-slide-in`}>
      <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${colors[type]}`}>
        {icons[type]}
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Message;
