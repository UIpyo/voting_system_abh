import React from "react";
import { Button, Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Link from "next/link";
const HeadComponent = () => {
  return (
    <Menu style={{ marginTop: "15px" }}>
      <Menu.Menu position="left">
        <Menu.Item>Voting Platform</Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link href="/">
            <Button content="View all elections" icon="eye" />
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default HeadComponent;
