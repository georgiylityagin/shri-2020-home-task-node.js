declare enum Status {
  Waiting = "Waiting",
  InProgress = "InProgress",
  Success = "Success",
  Fail = "Fail",
  Canceled = "Canceled"
}

declare interface BuildDetails {
  id: string;
  configurationId: string;
  buildNumber: number;
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
  status: Status;
  start: string;
  duration: number;
}

declare interface ResponsePostBuild {
  id: string;
  buildNumber: number;
  status: Status;
}

declare interface ResponseGetConfig {
  id: string;
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
}

declare interface PostConfig {
  repoName: string;
  buildCommand: string;
  mainBranch: string;
  period: number;
}

declare interface PostBuild {
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
}