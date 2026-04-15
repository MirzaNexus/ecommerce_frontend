import { CategoryTreeNode } from "../types/category.types";

export interface FlatCategory {
  id: string;
  name: string;
  level: number;
}

export function flattenCategoryTree(
  nodes: CategoryTreeNode[],
  level = 0,
): FlatCategory[] {
  let result: FlatCategory[] = [];

  for (const node of nodes) {
    result.push({
      id: node.id,
      name: node.name,
      level,
    });

    if (node.children?.length) {
      result = result.concat(flattenCategoryTree(node.children, level + 1));
    }
  }

  return result;
}
