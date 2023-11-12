import { useCallback } from 'react';
import { useAppDispatch } from '../../../../stores/hooks';
import { updateActiveTask } from '../../../../stores/slices/activeTaskSlice';
import { Tab, Task, TaskList } from '../../../../types/entity';
import { updateIsWorkSessionActive } from '../../../../stores/slices/workSessionSlice';

export const useRDKUpdateActiveTask = () => {
  const dispatch = useAppDispatch();

  const handleUpdateActiveTask = useCallback(
    (activeTab: Tab, activeList: TaskList, activeTask: Task) => {
      dispatch(
        updateActiveTask({
          tabId: activeTab.id,
          listId: activeList.id,
          id: activeTask.id,
          name: activeTask.name,
          elapsedSeconds: activeTask.totalTime,
          isTimerRunning: true,
        }),
      );
      dispatch(updateIsWorkSessionActive(true));
    },
    [dispatch],
  );

  return { handleUpdateActiveTask };
};
