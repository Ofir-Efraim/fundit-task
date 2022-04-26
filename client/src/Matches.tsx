import React from "react";
import { Match } from "./api";
export const Matches = ({
  matches,
  search,
  label,
}: {
  matches: Match[];
  search: string;
  label: string;
}) => {
  const filteredMatches = matches.filter((t) =>
    (
      t.borrower.user.firstName.toLowerCase() +
      t.borrower.user.lastName.toLowerCase() +
      t.companyName.toLowerCase() +
      t.borrower.user.email.toLowerCase()
    ).includes(search.toLowerCase())
    
  );
  const filteredWithLabel =
  label != '' ? filteredMatches.filter((t) => 
  (
    t.labels?.includes(label)
  )): filteredMatches;

  return (
    <ul className="matches">
      {filteredWithLabel ? (
        <div className="results">Showing {filteredWithLabel.length} results</div>
      ) : null}
      {filteredWithLabel.map((match) => (
        <li key={match.id} className="match">
          <h5 className="title">{match.companyName}</h5>
          <div className="matchData">
            <div>
              <div className="userDate">
                <div className="container">
              <b>Credit Score : </b>
                <div
                  className={
                      `csButton ${match.borrower.creditScore >= 679
                        ? "green"
                        : match.borrower.creditScore < 579
                        ? "red"
                        : "yellow"}`
                      }
                >
                  {match.borrower.creditScore}
                </div>
                </div>
              </div>
              <p className="userDate">
                <b>Full Name:</b> {match.borrower.user.firstName}{" "}
                {match.borrower.user.lastName}
              </p>
              <p className="userDate">
                <b>Email:</b> {match.borrower.user.email}
              </p>
              <p className="userDate">
                <b>Amount Request: </b> {match.amountReq}
              </p>
              <p className="userDate">
                <b>Balance: </b> {match.borrower.financeData.balance}{" "}
                {match.borrower.financeData.currency}
              </p>
            </div>
          </div>
          <footer>
            <div className="meta-data">
              Created At {new Date(match.creationTime).toLocaleString()}
            </div>
          </footer>
        </li>
      ))}
    </ul>
  );
};
