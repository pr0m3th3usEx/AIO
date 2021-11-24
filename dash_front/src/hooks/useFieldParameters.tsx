import { useEffect, useState } from 'react';

export function useFieldParameters<T, U>(widgets: U[] | undefined) {
  const [arr, setArray] = useState<T[]>([]);

  const setElement = (idx: number, e: T) => {
    const nArr = [...arr];
    nArr[idx] = e;

    setArray(nArr);
  };

  useEffect(() => {
    const newArr = new Array(widgets?.length ?? 0);
    setArray(newArr);
    console.log(newArr.length);
  }, [widgets]);

  return { widgetParameters: arr, setParamElement: setElement };
}
