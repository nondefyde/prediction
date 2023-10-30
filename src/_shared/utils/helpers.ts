import * as _ from 'lodash';


export const moneyFormat = (value: number | bigint) => {
    const formatter = new Intl.NumberFormat();
    return formatter.format(value);
};


export const getRandomColorByString = (name: string) => {
    name = name?.toUpperCase();
    return _.get(COLOR_LIST_ALPHA, getFirstCharacter(name) ?? 'A') ?? '#7B68ED';
};

export const getFirstCharacter = (name: string) => {
    return _.capitalize(name?.charAt(0));
};

export enum COLOR_LIST_ALPHA {
    A = '#3E82FF',
    B = '#C1EAFD',
    C = '#F56A00',
    D = '#7265E6',
    E = '#FFBF00',
    F = '#00A2AE',
    G = '#9C9C9D',
    H = '#F3D19B',
    I = '#CA99BC',
    J = '#BAB8F5',
    K = '#7B68ED',
    L = '#3E82FF',
    M = '#F3D19B',
    N = '#7265E6',
    O = '#CA99BC',
    P = '#F56A00',
    Q = '#CA99BC',
    R = '#F3D19B',
    S = '#F3D19B',
    T = '#9C9C9D',
    U = '#FFBF00',
    V = '#F3D19B',
    W = '#7265E6',
    X = '#00A2AE',
    Y = '#CA99BC',
    Z = '#C1EAFD',
}
  
interface DataItem {
  predictions: string[]; 
  teams: Record<string, any>[];
  _id: string;
  id: string;
}

export const getRandomItems = (array: DataItem[], n: number): DataItem[] => {
  if (n <= 0) {
    return [];
  }

  if (n >= array.length) {
    return shuffleArray(array);
  }

  const shuffledArray = shuffleArray(array);
  const selectedObjects: DataItem[] = [];

  for (let i = 0; i < n; i++) {
    if (i < array.length) {
      const obj = shuffledArray[i];
      if (obj.predictions && obj.predictions.length > 0) {
        const innerArray = shuffleArray(obj.predictions); 
        const randomItemCount = Math.floor(Math.random() * innerArray.length) + 1;
      
        const selectedItems: string[] = [];
        while (selectedItems.length < randomItemCount) {
          const randomIndex = Math.floor(Math.random() * innerArray.length);
          selectedItems.push(innerArray[randomIndex]);
        }
      
        selectedObjects.push({ ...obj, predictions: selectedItems });
      } else {
        selectedObjects.push({ ...obj, predictions: [] });
      }
      
    }
  }

  return selectedObjects;
};

// Fisher-Yates shuffle for an array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

