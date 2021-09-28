export interface ReadmeResponse {
  object: {
    text: string
  }
}

export interface GitHubResponse {
  stage0: ReadmeResponse
  stage1: ReadmeResponse
  stage2And3: ReadmeResponse
  stage4: ReadmeResponse
  i18nStage0: ReadmeResponse
  i18nStage1And2And3: ReadmeResponse
  i18nStage4: ReadmeResponse
  inactive: ReadmeResponse
}

export type ResponseKey = keyof GitHubResponse
export type ReadmesByStage = Record<ResponseKey, string>

export interface GetRepoInfoResponse {
  [proposalKey: string]: {
    stargazerCount: number
    defaultBranchRef: {
      name: string
    }
  }
}
