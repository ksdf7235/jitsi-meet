import React from "react";
import { dummy } from "./dummy";

function Welcome() {
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
                            <span>{i + 1}</span>
                        </div>
                        <div id="title">
                            <span>{item.roomNamekr}</span>
                        </div>
                        <div id="btn">
                            <img id="btn_img" src="/images/video.svg"></img>
                            <a href={`/${item.roomNameEng}`}>
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
