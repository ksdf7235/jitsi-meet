import { useMutation } from "@apollo/client";
import React from "react";
import { dummy } from "./dummy";
import { ENTER_QUERY } from "./mutation";

function PreJoinBtn({ children }) {
    const {roomName,name} = children.props;

    const hostNameKr = dummy
            .filter((a) => a.roomNameEng === roomName)
            .map((data) => data.roomNamekr)[0];

    const [enterdata] = useMutation(ENTER_QUERY);

    const onEnter = () => {
        enterdata({
            variables: {
                participantNameKr: name,
                hostNameEng: roomName,
                hostNameKr,
            },
        })
    }
    return (
        <div  onClick={onEnter}>
            {children}
        </div>
    );
}

export default PreJoinBtn;
