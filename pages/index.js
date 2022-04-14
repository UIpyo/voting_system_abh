import React, { Component } from "react";
import VotingFactory from "../ethereum/VotingFactory";
import "semantic-ui-css/semantic.min.css";
import { Button, Card, Grid, Segment, Divider } from "semantic-ui-react";
import Layout from "../components/Layout";
import Link from "next/link";

class AllElectionsPage extends Component {
  static async getInitialProps() {
    const allElections = await VotingFactory.methods
      .getDeployedElections()
      .call();
    return { allElections };
  }
  renderElections() {
    const singleElectionItem = this.props.allElections.map((address) => {
      return {
        header: address,
        description: (
          <div>
            <Link
              href={{
                pathname: "elections/[show]",
                query: { show: address },
              }}
            ></Link>
          </div>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={singleElectionItem}></Card.Group>;
  }
  render() {
    return (
      <Layout>
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>{this.renderElections()}</Grid.Column>
            <Grid.Column>
              <Link href="/elections/new">
                <Button
                  floated="right"
                  color="green"
                  content="Create a New Election"
                  icon="add circle"
                  labelPosition="right"
                />
              </Link>
            </Grid.Column>
          </Grid>
          <Divider vertical></Divider>
        </Segment>
      </Layout>
    );
  }
}

export default AllElectionsPage