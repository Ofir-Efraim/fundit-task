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
  React.useEffect(() => {
    async function fetchMatches() {
      setMatches(await api.getMatches());
    }
    fetchMatches();
  }, []);
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
      <header>
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </header>
      <div style={{display:'flex', alignItems:'center'}}>
      <h2>Filter by Label :</h2>
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
      {matches ? (
        <Matches matches={matches} search={search} label={label} />
      ) : (
        <h2>Loading...</h2>
      )}
    </main>
  );
};
export default App;
