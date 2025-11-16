// Un nodo puede ser de pregunta o de solución
export interface QuestionNode {
  question: string;
  yes: string;
  no: string;
  
}

export interface SolutionNode {
  solution: string[];
  resources:{
    type:string;
    url:string
  }[]
}

// Unión de tipos permitidos
export type TreeNode = QuestionNode | SolutionNode;

// Un conjunto de nodos siempre es un diccionario dinámico
export interface TreeLevel {
  start: string;
  nodes: Record<string, TreeNode>;
}

// Las escalas AE, DP, RP tienen niveles bajo / medio / alto
export interface TreeScales {
  AE: {
    bajo: TreeLevel;
    medio: TreeLevel;
    alto: TreeLevel;
  };
  DP: {
    bajo: TreeLevel;
    medio: TreeLevel;
    alto: TreeLevel;
  };
  RP: {
    bajo: TreeLevel;
    medio: TreeLevel;
    alto: TreeLevel;
  };
}

export type Scale = "AE" | "DP" | "RP";
export type Level = "bajo" | "medio" | "alto";

type NodeId<T extends TreeLevel> = keyof T["nodes"] & string;

interface Levels {
  AE: Level;
  DP: Level;
  RP: Level;
}

export type Progress = {
  [K in Scale]: string; // safer, actual node ID strings
};

// export type Progress = {
//   [K in Scale]: NodeId<TreeScales[K][Levels[K]]>;
// };

export interface PropsPostMbiFormTree {
  levels: {
    [key in Scale]: Level;
  };
}
