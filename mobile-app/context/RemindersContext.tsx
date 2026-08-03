import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Reminder {
  id: number;
  title: string;
  person: string;
  date: string;
  occasion: "birthday" | "anniversary" | "graduation" | "other";
  daysLeft: number;
}

export interface RemindersContextType {
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, "id"> | Omit<Reminder, "id" | "daysLeft">) => void;
  deleteReminder: (id: number) => void;
  removeReminder: (id: number) => void;
}

const REMINDERS_STORAGE_KEY = "@warda_reminders_v1";

function calculateDaysLeft(dateStr: string): number {
  const parts = dateStr.split(" ");
  if (parts.length !== 2) return 0;
  const monthStr = parts[0];
  const day = parseInt(parts[1], 10);
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthIndex = months.indexOf(monthStr);

  if (monthIndex === -1 || isNaN(day)) return 0;

  const now = new Date();
  // Strip time for accurate day difference
  now.setHours(0, 0, 0, 0);
  
  let targetDate = new Date(now.getFullYear(), monthIndex, day);
  
  if (targetDate.getTime() < now.getTime()) {
    targetDate.setFullYear(now.getFullYear() + 1);
  }

  const diffTime = targetDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

const initialReminders: Reminder[] = [
  { id: 1, title: "Mother's Birthday", person: "Mom", date: "August 15", occasion: "birthday", daysLeft: calculateDaysLeft("August 15") },
  { id: 2, title: "Wedding Anniversary", person: "Wife", date: "September 20", occasion: "anniversary", daysLeft: calculateDaysLeft("September 20") },
  { id: 3, title: "Brother's Graduation", person: "Brother", date: "June 5", occasion: "graduation", daysLeft: calculateDaysLeft("June 5") },
  { id: 4, title: "Majed's Birthday", person: "Majed", date: "August 30", occasion: "birthday", daysLeft: calculateDaysLeft("August 30") },
];

const RemindersContext = createContext<RemindersContextType | undefined>(undefined);

export const RemindersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(REMINDERS_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReminders(parsed);
          }
        }
      } catch (e) {
        console.log("Error loading reminders:", e);
      }
    })();
  }, []);

  const saveReminders = async (list: Reminder[]) => {
    setReminders(list);
    try {
      await AsyncStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.log("Error saving reminders:", e);
    }
  };

  const addReminder = (data: Omit<Reminder, "id"> | Omit<Reminder, "id" | "daysLeft">) => {
    const daysLeft = "daysLeft" in data && typeof data.daysLeft === "number" 
      ? data.daysLeft 
      : calculateDaysLeft(data.date);

    const newReminder: Reminder = {
      ...data,
      id: Date.now(),
      daysLeft,
    };
    saveReminders([newReminder, ...reminders]);
  };

  const deleteReminder = (id: number) => {
    saveReminders(reminders.filter((r) => r.id !== id));
  };

  return (
    <RemindersContext.Provider
      value={{
        reminders,
        addReminder,
        deleteReminder,
        removeReminder: deleteReminder,
      }}
    >
      {children}
    </RemindersContext.Provider>
  );
};

export const useReminders = () => {
  const context = useContext(RemindersContext);
  if (!context) {
    throw new Error("useReminders must be used within a RemindersProvider");
  }
  return context;
};
