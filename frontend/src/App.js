import React, { Component } from "react";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import Candidates from "./components/Candidates";
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      candidates: [],
      previousVotes: [],
      previousPercentages: [],
    };

    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      fetch("http://localhost:8080/votes")
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const previousVotes = this.state.candidates.map(({ id, votes }) => {
            return { id, votes };
          });
          
          const previousPergentages = this.state.candidates.map(({ id, percentage }) => {
            return { id, percentage };
          });

          this.setState({
            candidates: json.candidates,
            previousVotes,
            previousPergentages
          });
        });
    }, 1000);
  }

  render() {
    const { candidates, previousVotes, previousPergentages } = this.state;

    if (candidates.length === 0) {
      return <Spinner description="Carregando..." />;
    }

    return (
      <div className="container">
        <Header>Resultado Votação</Header>
        <Candidates candidates={candidates} previousVotes={previousVotes} previousPergentages = {previousPergentages}/>
      </div>
    );
  }
}
