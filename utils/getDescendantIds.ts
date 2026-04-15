import { CategoryTreeNode } from "../types/category.types";

export function getDescendantIds(node: CategoryTreeNode): string[] {
  let ids: string[] = [];

  for (const child of node.children || []) {
    ids.push(child.id);

    if (child.children?.length) {
      ids = ids.concat(getDescendantIds(child));
    }
  }

  return ids;
}
