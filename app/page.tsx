'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Reminder {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function ReminderApp() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addReminder = () => {
    if (title && date) {
      const newReminder: Reminder = {
        id: Date.now(),
        title,
        description,
        date
      };
      setReminders([...reminders, newReminder]);
      setTitle('');
      setDescription('');
      setDate('');
    }
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="absolute top-4 right-4 p-2 rounded"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">🔔 Smart Reminder</h1>
        
        <div className="mb-4">
          <input 
            type="text"
            placeholder="Название напоминания"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea 
            placeholder="Описание (необязательно)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <input 
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <button 
            onClick={addReminder}
            className="w-full p-2 bg-blue-500 text-white rounded mt-2"
          >
            Добавить напоминание
          </button>
        </div>

        {reminders.map(reminder => (
          <motion.div 
            key={reminder.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-100 p-4 rounded mb-2 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{reminder.title}</h3>
              <p>{reminder.description}</p>
              <p className="text-sm text-gray-500">{reminder.date}</p>
            </div>
            <button 
              onClick={() => deleteReminder(reminder.id)}
              className="text-red-500"
            >
              🗑️
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}