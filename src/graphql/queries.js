/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStrategy = /* GraphQL */ `
  query GetStrategy($id: ID!) {
    getStrategy(id: $id) {
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
export const listStrategys = /* GraphQL */ `
  query ListStrategys(
    $filter: ModelStrategyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStrategys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dateStart
        dateEnd
        investmentAmount
        investmentFrequency
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
