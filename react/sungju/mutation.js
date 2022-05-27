import { gql } from "@apollo/client";

export const ENTER_MUTATION = gql`
            mutation Sungju(
                $hostNameEng: String!
                $hostNameKr: String!
                $participantNameKr: String!
                $participantNameEng:: String!
            ) {
                createSungju(
                    hostNameEng: $hostNameEng
                    hostNameKr: $hostNameKr
                    participantNameKr: $participantNameKr
                    participantNameEng:: $participantNameEng:
                ) {
                    ok
                }
            }
        `;
export const ENTER_QUERY = gql`
            mutation Sungju(
                $hostNameEng: String!
                $hostNameKr: String!
                $participantNameKr: String!
                $participantNameEng:: String!
            ) {
                createSungju(
                    hostNameEng: $hostNameEng
                    hostNameKr: $hostNameKr
                    participantNameKr: $participantNameKr
                    participantNameEng:: $participantNameEng:
                ) {
                    ok
                }
            }
        `;
