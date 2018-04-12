interface Tag {
  _id: string;
  tagName: string;
  arrayOfProjectIds: string[];
}
export interface Tags {
  tags: Tag[];
}
