export const coreSchema = `#graphql
  type Audit {
    createdOn: String!
    createdBy: String!
    modifiedOn: String
    modifiedBy: String
  }

  interface Audited {
    audit: Audit!
  }
`
