import { useState, useCallback } from 'react';

type RefreshAction = () => Promise<void>;

const useRefresh = (refreshAction: RefreshAction) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshAction();
    setRefreshing(false);
  }, [refreshAction]);

  return { refreshing, onRefresh };
};

export default useRefresh;