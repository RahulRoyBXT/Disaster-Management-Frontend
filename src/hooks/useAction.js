import { useState } from 'react';

export function useAction(actionFn) {
  const [state, setState] = useState({
    isExecuting: false,
    error: null,
    data: null,
  });

  const execute = async (...args) => {
    setState({
      isExecuting: true,
      error: null,
      data: null,
    });

    try {
      const result = await actionFn(...args);
      setState({
        isExecuting: false,
        error: null,
        data: result,
      });
      return { success: true, data: result };
    } catch (error) {
      setState({
        isExecuting: false,
        error: error instanceof Error ? error : new Error(String(error)),
        data: null,
      });
      return { success: false, error };
    }
  };

  return {
    ...state,
    execute,
  };
}
