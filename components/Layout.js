import React from "react";
import HeadComponent from "./Header";
import { Container} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Layout = (props) => {
    return (
        <Container>
            <HeadComponent/>
            {props.children}
        </Container>
    )
}

export default Layout