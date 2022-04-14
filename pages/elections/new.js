import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import VotingFactory from "../../ethereum/VotingFactory";
import web3 from "../../ethereum/web3";
import Router from "next/router";

class CreateElection extends Component{
    state = {
        electionType:"",
        electionName:"",
        electionLevel:"",
        errMsg:"",
        loading:false,
    }

    onSubmit = async (event) => {
        event.preventDefault()
        this.setState({
            errMsg:"",
        })
        try{
            const accounts = await web3.eth.getAccounts()
            await VotingFactory.methods.createElection(this.state.electionName,this.state.electionLevel,this.state.electionType,accounts[0]).send({
                from: accounts[0],
            })
            Router.push("/")
        }
        catch(err){
            this.setState({
                errMsg: err.message
            })
        }
        this.setState({
            loading:false,
        })
    }
    render() {
        return (
          <Layout>
            <h1>Create a new Election!</h1>
            <Form
              onSubmit={this.onSubmit}
              style={{ marginTop: "25px" }}
              error={!!this.state.errMsg}
            >
              <Form.Field>
                <label>Election Name</label>
                <Input
                  style={{ paddingTop: "5px" }}
                  value={this.state.electionName}
                  onChange={(event) => {
                    this.setState({
                      electionName: event.target.value,
                    });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Election Type</label>
                <Input
                  style={{ paddingTop: "5px" }}
                  value={this.state.electionType}
                  onChange={(event) => {
                    this.setState({
                      electionType: event.target.value,
                    });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Election Level</label>
                <Input
                  style={{ paddingTop: "5px" }}
                  value={this.state.electionLevel}
                  onChange={(event) => {
                    this.setState({
                      electionLevel: event.target.value,
                    });
                  }}
                />
              </Form.Field>
              <Message
                error
                header="Something went wrong"
                content={this.state.errMsg}
              />
              <Button loading={this.state.loading} color="green" type="submit">
                Create
              </Button>
            </Form>
          </Layout>
        );
      }
}

export default CreateElection