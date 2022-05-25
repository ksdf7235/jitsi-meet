import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { dummy } from "./dummy";

const EXAMPLE_QUERY = gql`
    query ExampleQuery {
        sungjues {
            id
        }
    }
`;
const EXAMPLE_MUTATION = gql`
    mutation ExampleMutation(
        $hostNameEng: String!,
        $hostNameKr: String!,
        $participantNameEng: String!,
        $participantNameKr: String!
    ) {
        createSungju(
            hostNameEng: $hostNameEng,
            hostNameKr: $hostNameKr,
            participantNameEng: $participantNameEng,
            participantNameKr: $participantNameKr
        ) {
            ok
        }
    }
`;

function Welcome() {
    const { data } = useQuery(EXAMPLE_QUERY);
    const [sungju] = useMutation(EXAMPLE_MUTATION);
    const onClick = (item) => {
        const {
            hostNameEng,
            hostNameKr,
            participantNameEng,
            participantNameKr,
        } = item;

        sungju({
            variables: {
                hostNameEng,
                hostNameKr,
                participantNameEng,
                participantNameKr
            },
        });
    };
    return (
        <div id="sungju" className="sungju">
            <div id="sungju_header">
                <div id="sungju_upper_header">
                    성주군청 마을회관 회의방 목록
                </div>
                <div id="sungju_bottom_header">
                    <div>입장하실 회의방의 접속 버튼을 눌러 접속하세요!</div>
                    <div id="sungju_bottom_header_icon"></div>
                </div>
            </div>
            <div id="Enter_Block_Layout">
                {dummy.map((item, i) => (
                    <div id="Enter_Block" key={i} onClick={() => onClick(item)}>
                        <div id="number">
                            <span>{item.id}</span>
                        </div>
                        <div id="title">
                            <span>{item.hostNameKr}</span>
                        </div>
                        <div id="btn">
                            <img id="btn_img" src="/images/video.svg"></img>
                            <a href="/1">
                                <span>입장하기</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Welcome;
