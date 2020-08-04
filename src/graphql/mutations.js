/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStrategy = /* GraphQL */ `
  mutation CreateStrategy(
    $input: CreateStrategyInput!
    $condition: ModelStrategyConditionInput
  ) {
    createStrategy(input: $input, condition: $condition) {
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
export const updateStrategy = /* GraphQL */ `
  mutation UpdateStrategy(
    $input: UpdateStrategyInput!
    $condition: ModelStrategyConditionInput
  ) {
    updateStrategy(input: $input, condition: $condition) {
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
export const deleteStrategy = /* GraphQL */ `
  mutation DeleteStrategy(
    $input: DeleteStrategyInput!
    $condition: ModelStrategyConditionInput
  ) {
    deleteStrategy(input: $input, condition: $condition) {
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
export const createStrategyRecommended = /* GraphQL */ `
  mutation CreateStrategyRecommended(
    $input: CreateStrategyRecommendedInput!
    $condition: ModelStrategyRecommendedConditionInput
  ) {
    createStrategyRecommended(input: $input, condition: $condition) {
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
export const updateStrategyRecommended = /* GraphQL */ `
  mutation UpdateStrategyRecommended(
    $input: UpdateStrategyRecommendedInput!
    $condition: ModelStrategyRecommendedConditionInput
  ) {
    updateStrategyRecommended(input: $input, condition: $condition) {
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
export const deleteStrategyRecommended = /* GraphQL */ `
  mutation DeleteStrategyRecommended(
    $input: DeleteStrategyRecommendedInput!
    $condition: ModelStrategyRecommendedConditionInput
  ) {
    deleteStrategyRecommended(input: $input, condition: $condition) {
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
