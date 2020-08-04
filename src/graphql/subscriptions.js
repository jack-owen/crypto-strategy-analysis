/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStrategy = /* GraphQL */ `
  subscription OnCreateStrategy($owner: String!) {
    onCreateStrategy(owner: $owner) {
      id
      dateStart
      dateEnd
      investmentAmount
      investmentFrequency
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateStrategy = /* GraphQL */ `
  subscription OnUpdateStrategy($owner: String!) {
    onUpdateStrategy(owner: $owner) {
      id
      dateStart
      dateEnd
      investmentAmount
      investmentFrequency
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteStrategy = /* GraphQL */ `
  subscription OnDeleteStrategy($owner: String!) {
    onDeleteStrategy(owner: $owner) {
      id
      dateStart
      dateEnd
      investmentAmount
      investmentFrequency
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateStrategyRecommended = /* GraphQL */ `
  subscription OnCreateStrategyRecommended {
    onCreateStrategyRecommended {
      id
      dateStart
      dateEnd
      investmentAmount
      investmentFrequency
      duration
      returnAmount
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStrategyRecommended = /* GraphQL */ `
  subscription OnUpdateStrategyRecommended {
    onUpdateStrategyRecommended {
      id
      dateStart
      dateEnd
      investmentAmount
      investmentFrequency
      duration
      returnAmount
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStrategyRecommended = /* GraphQL */ `
  subscription OnDeleteStrategyRecommended {
    onDeleteStrategyRecommended {
      id
      dateStart
      dateEnd
      investmentAmount
      investmentFrequency
      duration
      returnAmount
      createdAt
      updatedAt
    }
  }
`;
