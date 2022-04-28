import React from "react";
import "./App.css";
import { Matches } from "./Matches";
import { createApiClient, Match } from "./api";

export type AppState = {
  matches?: Match[];
  search: string;
  label : string;
};

const api = createApiClient();
const App = () => {
  const [search, setSearch] = React.useState<string>("");
  const [matches, setMatches] = React.useState<Match[]>([]);
  const [label, setLabel] = React.useState<string>("");
  const [data, setData] = React.useState<any>({});
  const [approved, setApproved] = React.useState<number>(0);
  const [declined, setDeclined] = React.useState<number>(0);
  async function fetchMatches() {
    setData(await api.getMatches());
    setMatches(data.paginatedData);
    setApproved(data.approved);
    setDeclined(data.declined);
  }
  const onApprove = (id:any) => {
    api.deleteMatch(id, 'approved');
  }
  const onDecline = (id:any) => {
    api.deleteMatch(id, 'denied');
  }
  React.useEffect(() => {
    fetchMatches();
    // Got an unnecessary warrning, added the following line to ignore it.
    // eslint-disable-next-line
  }, [matches]);
  let searchDebounce: any;
  const onSearch = (val: string, newPage?: number) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(async () => {
      setSearch(val);
    }, 300);
  };
  return (
    <main>
      <h1>Matches List</h1>
      <header style={{width:'50%', margin:'0 auto'}}>
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </header>
      <div style={{display:'flex', alignItems:'center'}}>
      <h3>Filter by Label :</h3>
      <select
            className='selectLabel'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            >
              <option value=""></option>
              <option value="Decline">Decline</option>
              <option value="Possible">Possible</option>
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </select>
      </div>
      <div className="approved">Approved: {approved}</div>
      <div className="declined">Declined: {declined}</div>
      {matches ? (
        <Matches onApprove={onApprove} onDecline={onDecline} matches={matches} search={search} label={label} />
      ) : (
        <h2>Loading...</h2>
      )}
    </main>
  );
};
export default App;
