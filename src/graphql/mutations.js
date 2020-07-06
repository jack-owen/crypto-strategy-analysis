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
    }
  }
`;
