import React from "react";
import { Match } from "./api";
export const Matches = ({
  matches,
  search,
  label,
  onApprove,
  onDecline,
}: {
  matches: Match[];
  search: string;
  label: string;
  onApprove: Function;
  onDecline: Function;
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
  label !== '' ? filteredMatches.filter((t) => 
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
          <div className={
                      `semiCircle ${match.borrower.creditScore >= 700
                        ? "greenFull"
                        : match.borrower.creditScore > 579 && match.borrower.creditScore < 700 
                        ? "green75"
                        : match.borrower.creditScore < 579
                        ? "red"
                        : "yellow"}`
                      }>
          {match.borrower.creditScore}
          </div>
          <div className="matchData">
              <div className="userDate">
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
              <div className="buttonsContainer">
                <button onClick={ () => onApprove(match.id)} className="buttons" style={{marginRight:'20px', backgroundColor:'#c2fbd7'}}>Approve</button>
                <button onClick={ () => onDecline(match.id)} className="buttons" style={{backgroundColor:'#ff7f7f'}}>Decline</button>
              </div>
          </footer>
        </li>
      ))}
    </ul>
  );
};
