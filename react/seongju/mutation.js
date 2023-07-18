import { gql } from "@apollo/client";

export const EXAMPLE_QUERY = gql`
    query ExampleQuery {
        seongjues {
            id
        }
    }
`;
export const FIND_QUERY = gql`
    query ExampleQuery($participantNameKr: String!) {
        seongju(participantNameKr: $participantNameKr) {
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
        createseongju(
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
        $participantNameKr: String!
        $hostNameEng: String
        $hostNameKr: String
    ) {
        EnterTime(
            participantNameKr: $participantNameKr
            hostNameEng: $hostNameEng
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
export const LOG_ENTER_QUERY = gql`
    mutation LogEnterMutation(
        $participantNameKr: String
        $hostNameEng: String
        $hostNameKr: String
    ) {
        EnterLog(
            participantNameKr: $participantNameKr
            hostNameEng: $hostNameEng
            hostNameKr: $hostNameKr
        ) {
            ok
            message
        }
    }
`;
export const LOG_EXIT_QUERY = gql`
    mutation LogExitMutation(
        $participantNameKr: String
        $hostNameEng: String
        $hostNameKr: String
        $enteredDate: String
    ) {
        ExitLog(
            participantNameKr: $participantNameKr
            hostNameEng: $hostNameEng
            hostNameKr: $hostNameKr
            enteredDate: $enteredDate
        ) {
            ok
            message
        }
    }
`;
