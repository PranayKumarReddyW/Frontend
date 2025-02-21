import { useState } from "react";

type Action<T, A extends any[]> = (...args: A) => Promise<T>;

export function useActionState<T, A extends any[]>(
  action: Action<T, A>,
  initialState: T
): [T, (...args: A) => Promise<void>, boolean] {
  const [state, setState] = useState<T>(initialState);
  const [isPending, setIsPending] = useState<boolean>(false);

  const executeAction = async (...args: A) => {
    setIsPending(true);
    try {
      const result = await action(...args);
      setState(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  return [state, executeAction, isPending];
}
