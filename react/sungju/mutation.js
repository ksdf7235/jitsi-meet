import { gql } from '@apollo/client';

export const EXAMPLE_QUERY = gql`
    query ExampleQuery {
        sungjues {
            id
        }
    }
`;
export const FIND_QUERY = gql`
    query ExampleQuery($participantNameKr: String!) {
        sungju(participantNameKr: $participantNameKr) {
            id
        }
    }
`;
export const EXAMPLE_MUTATION = gql`
    mutation ExampleMutation(
        $hostNameEng: String!
        $hostNameKr: String!
        $participantNameEng: String!
        $participantNameKr: String!
    ) {
        createSungju(
            hostNameEng: $hostNameEng
            hostNameKr: $hostNameKr
            participantNameEng: $participantNameEng
            participantNameKr: $participantNameKr
        ) {
            ok
        }
    }
`;

export const ENTER_QUERY = gql`
    mutation EnterMutation(
        $participantNameKr: String!,
        $hostNameEng: String,
        $hostNameKr: String
    ) {
        EnterTime(
            participantNameKr: $participantNameKr,
            hostNameEng: $hostNameEng,
            hostNameKr: $hostNameKr
        ) {
            ok
        }
    }
`;
export const EXIT_QUERY = gql`
    mutation ExitMutation($participantNameKr: String!) {
        ExitTime(participantNameKr: $participantNameKr) {
            ok
        }
    }
`;
