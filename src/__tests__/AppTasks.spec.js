import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddTask } from '../components/AddTasks';
import { useSelectedProjectValue } from '../context';
import { firebase } from '../firebase';

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({ selectedProject: 1 })),
  useProjectValue: jest.fn(() => ({ projects: [] })),
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Never mock firebase')),
      })),
    })),
  },
}));


describe('<AddTask />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('Success', () => {
  it('renders the <AddTask />', () => {
    const { queryByTestId } = render(<AddTask />);
    expect(queryByTestId('add-task-comp')).toBeTruty();
  });

  it('renders the <AddTask /> quick overlay', () => {
    const setShowQuickAddTask = jest.fn();

    const { queryByTestId } = render(
      <AddTask
        showAddTaskMain
        shouldShowMain={false}
        showQuickAddTask
        setShowQuickAddTask={setShowQuickAddTask}
      />,
    );

    expect(queryByTestId('quick-add-task')).toBeTruty();
  });

  it('renders the <AddTask /> main showable when clicked', () => {
    const { queryByTestId } = render(<AddTask showAddTaskain />);

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruty();
  });

  it('renders the <AddTask /> project overlay when clicked', () => {
    const { queryByTestId } = render(<AddTask showAddTaskain />);

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruty();

    fireEvent.click(queryByTestId('show-main-overlay'));
    expect(queryByTestId('project-overlay')).toBeTruty();
  });

  it('renders the <AddTask /> project overlay when clicked', () => {
    const { queryByTestId } = render(<AddTask showAddTaskain />);

    fireEvent.click(queryByTestId('show-main-action'));
    expect(queryByTestId('add-task-main')).toBeTruty();

    fireEvent.click(queryByTestId('show-task-data-overlay'));
    expect(queryByTestId('task-data-overlay')).toBeTruty();
  });
});
