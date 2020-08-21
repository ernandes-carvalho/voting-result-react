import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import Candidates from "./components/Candidates";

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [previousVotes, setPreviousVotes] = useState([]);
  const [previousPergentages, setPreviousPercentages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8080/votes")
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const localPreviousVotes = candidates.map(({ id, votes }) => {
            return { id, votes };
          });

          const localPreviousPergentages = candidates.map(
            ({ id, percentage }) => {
              return { id, percentage };
            }
          );

          setCandidates(json.candidates);
          setPreviousVotes(localPreviousVotes);
          setPreviousPercentages(localPreviousPergentages);
        });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [candidates, previousVotes, previousPergentages]);

  if (candidates.length === 0) {
    return <Spinner description="Carregando..." />;
  }

  return (
    <div className="container">
      <Header>Resultado Votação</Header>
      <Candidates
        candidates={candidates}
        previousVotes={previousVotes}
        previousPergentages={previousPergentages}
      />
    </div>
  );
}
