export const loadState = <T>(key: string): T | undefined => {
  try {
    const jsonState = localStorage.getItem(key);
    if (!jsonState) {
      return undefined;
    }
    return JSON.parse(jsonState);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const saveState = <T>(state: T, key: string): void => {
  const stringState = JSON.stringify(state);
  localStorage.setItem(key, stringState);
};