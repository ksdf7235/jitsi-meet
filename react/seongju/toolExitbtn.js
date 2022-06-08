import { useMutation } from "@apollo/client";
import React from "react";
import { EXIT_QUERY } from "./mutation";

function Exitbtn({ children }) {
    const [backdata] = useMutation(EXIT_QUERY);

    const back = () => {
        backdata({
            variables: {
                participantNameKr: children.props.name,
            },
        });
    };
    return (
        <div id="ExitBtn" onClick={back}>
            {children}
        </div>
    );
}

export default Exitbtn;
