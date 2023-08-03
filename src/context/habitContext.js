import { createContext, useReducer, useState } from "react";
import { data } from "../db";

export const HabitContext = createContext();
export const HabitProvider = ({ children }) => {
  const [showModal, setShowModal] = useState({ show: false, data: "" });
  const [addHabit, setAddHabit] = useState(false);
  const initialData = {
    habits: data,
    archive: [],
  };

  const habitHandler = (state, action) => {
    switch (action.type) {
      case "add": {
        return {
          ...state,
          habits: [...state.habits, action.payload],
        };
      }
      case "save":
        return {
          ...state,
          habits: state.habits.map((item) => {
            if (item.id === action.id) {
              return action.payload;
            } else {
              return item;
            }
          }),
        };
      case "archive": {
        return {
          ...state,
          habits: state.habits.filter((item) => item.id !== action.id),
          archive: [...state.archive, action.payload],
        };
      }
      case "delete": {
        return {
          ...state,
          habits: state.habits.filter((item) => item.id !== action.payload),
        };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(habitHandler, initialData);
  console.log(state);
  return (
    <HabitContext.Provider
      value={{
        state,
        dispatch,
        showModal,
        setShowModal,
        addHabit,
        setAddHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
