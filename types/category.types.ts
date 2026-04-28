export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  parentName: string | null;
  createdAt: string;
  deletedAt: string | null;
}

export interface CategoryTreeNode {
  id: string;
  name: string;
  parentId: string | null;
  children: CategoryTreeNode[];
}

export interface CreateCategoryPayload {
  name: string;
  parentId?: string;
}

export interface UpdateCategoryPayload {
  name?: string;
  parentId?: string | null;
}

export type CategoryId = string;
