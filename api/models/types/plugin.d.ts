declare module 'mongoose' {
  export interface mongoosePaginateDocument {...}
  export interface mongoosePaginateSchema extends Schema {...}
  export interface mongoosePaginateModel<T extends mongoosePaginateDocument> extends Model<T> {...}
  ...
}

declare module 'mongoose-paginate' {
  var mongoose = require('mongoose');
  var _: (schema: mongoose.Schema, options?: Object) => void;
  export = _;
}

// project.ts
import {
  model,
  mongoosePaginateDocument,
  mongoosePaginateSchema,
  mongoosePaginateModel,
  Schema
} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';

var ProjectSchema: mongoosePaginateSchema = new Schema({});
ProjectSchema.plugin(mongoosePaginate, options);

interface IProjects extends mongoosePaginateDocument {...}
interface IDocumentModel<T extends mongoosePaginateDocument> extends mongoosePaginateModel<T> {...}

var ProjectModel: IDocumentModel<IProjects> = model<IProjects>('Project', ProjectSchema);