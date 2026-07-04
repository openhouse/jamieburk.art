import type { WorkMeta } from "@jamieburk-art/content-model";

export type {
  ContentState,
  PracticeBody,
  WorkMeta
} from "@jamieburk-art/content-model";

export type WorkItem = WorkMeta & {
  body: string;
  sourcePath: string;
};
