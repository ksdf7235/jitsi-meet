import { useMutation } from "@apollo/client";
import React from "react";
import { dummy } from "./dummy";
import { ENTER_QUERY } from "./mutation";

function Welcome() {
    const testname = "경산1리";

    const [data] = useMutation(ENTER_QUERY);

    const test = (item) => {
        console.log("test");
        const value = data({
            variables: {
                participantNameKr: testname,
            },
        });
        console.log(value);
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
                    <div id="Enter_Block" key={i} onClick={() => test(item)}>
                        <div id="number">
                            <span>{item.id}</span>
                        </div>
                        <div id="title">
                            <span>{item.hostNameKr}</span>
                        </div>
                        <div id="btn">
                            <img id="btn_img" src="/images/video.svg"></img>
                            <a href={`/${item.hostNameEng}`}>
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
