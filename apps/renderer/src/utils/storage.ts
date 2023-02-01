export const saveToStorage = (name: string, state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(name, serializedState);
  } catch (error) {
    console.error(error);
  }
};

export const getFromStorage = (name: string) => {
  try {
    const serializedState = localStorage.getItem(name);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
