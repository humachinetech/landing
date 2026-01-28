import { gql } from '@apollo/client'

export const CREATE_LEAD = gql`
  mutation CreateLead($createLeadInput: CreateLeadInput!) {
    createLead(createLeadInput: $createLeadInput) {
      id
      email
      name
      subscribed
      createdAt
    }
  }
`
