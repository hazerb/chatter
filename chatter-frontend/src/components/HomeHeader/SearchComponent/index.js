import { useDispatch, useSelector } from "react-redux";
import { Search } from "semantic-ui-react";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { search, resetSearch, finishSearch } from "../../../redux/search/api";

import { searchStartAction } from "../../../redux/search/actions";

const SearchComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector((state) => state.search.loading);
  const users = useSelector((state) => state.search.users);
  const results = useSelector((state) => state.search.results);

  const [firstSearch, setFirstSearch] = useState(true);

  var searching;
  const handleSearchChange = async (e) => {
    dispatch(searchStartAction());
    clearTimeout(searching);
    searching = setTimeout(() => {
      const data = e.target.value;
      if (data.length === 0) {
        setFirstSearch(true);
        dispatch(resetSearch());
      }
      let re = new RegExp(data, "i");
      var result = users.filter((user) => re.test(user.name));
      dispatch(finishSearch(result));
    }, 300);
  };

  useEffect(() => {
    if (firstSearch) {
      setFirstSearch(false);
      dispatch(search());
    }
  }, [firstSearch]);

  return (
    <Search
      loading={loading}
      onResultSelect={(e, data) => history.push("/profile/" + data.result.id)}
      onSearchChange={(e) => handleSearchChange(e)}
      results={results}
    />
  );
};

export default SearchComponent;
