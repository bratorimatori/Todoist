/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExists } from '../helpers';

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase.firestore().collection('tasks').where('userId', '==', '33228d581c948c5c7db05f9e8eb15437');

    unsubscribe = selectedProject && !collatedTasksExists(selectedProject)
      ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
      : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where('data', '==', moment().format('DD/MM/YYYY')))
        : selectedProject === 'INBOX' || selectedProject === 0
          ? (unsubscribe = unsubscribe.where('date', '==', ''))
          : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
            (task) => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7
                && task.archived !== true,
          )
          : newTasks.filter((task) => task.archived !== true),
      );
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProject = () => {
  const [projects, setprojects] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('projects').where('userId', '==', '33228d581c948c5c7db05f9e8eb15437')
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: projects.id,
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setprojects(allProjects);
        }
      });
  }, [projects]);
};
