import BaseModel from "./BaseModel";

export default interface RequestModel extends BaseModel {
  id: string;
  parentId: string;
}
