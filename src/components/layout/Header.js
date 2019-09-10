/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { FaPizzaSlice } from 'react-icons/fa';
import { useProjects } from '../../hooks';
import { AddTask } from '../AddTasks';

export const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li
              date-testid="quick-add-task-action"
              className="settings__add"
              onClick={() => {
                setShowQuickAddTask(true);
                setShouldShowMain(true);
              }}
            >
              +
            </li>
            <li
              date-testid="dark-mode-action"
              className="settings__darkmode"
              onClick={() => setDarkMode(!darkMode)}
            >
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
};
