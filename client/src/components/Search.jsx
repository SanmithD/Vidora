import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseSearchStore } from "../store/SearchStore";

function Search() {
  const { currentSearching, searching, saveSearch } = UseSearchStore();
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue.trim().length > 0) {
      currentSearching(searchValue);
      setSuggestions(true);
    } else {
      setSuggestions(!suggestions);
    }
  }, [searchValue, currentSearching]);

  const handleFind = async(id) =>{
    await saveSearch(id);
  }

  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className="w-[150px] bg-gray-800 md:w-full lg:w-full outline-0 border-1 rounded pl-3 py-1.5 text-white"
      />
      {suggestions && (
        <div className="absolute z-50 space-y-4 h-fit max-h-[400px] overflow-y-scroll bg-gray-900 p-2 rounded shadow text-white">
          <button className="absolute z-20 top-0 right-0 cursor-pointer " onClick={()=>setSuggestions(false)} ><X/></button>
          {
            Array.isArray(searching) && searching.length > 0 ? (
              searching.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) ).map((data) => (
                <div key={data._id} onClick={()=>{ handleFind(data._id), navigate(`/singlePage/${data._id}`)}} className="cursor-pointer" >
                  <p>{data.title} </p>
                  <p className="text-[16px] text-gray-500 " >{ new Date(data.createdAt).toLocaleDateString() } </p>
                </div>
              ))
            ) : null
          }
        </div>
      )}
    </div>
  );
}

export default Search;
