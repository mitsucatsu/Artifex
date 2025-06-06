import React from "react";
import { Spinner } from "react-bootstrap";
function Loader() {
    return (
        <Spinner
            animation="border"
            role="status"
            style={{
                height: "5em",
                width: "5em",
                margin: "auto",
                display: "block",
            }}>
                <span className="sr-only">Loading...</span>
        </Spinner>
    );
}

export default Loader;