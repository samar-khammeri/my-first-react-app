
import { useState, useEffect } from 'react';

const API_BASE_URL = 'https://hn.algolia.com/api/v1/search?query=';

const Item = ({ story, onRemoveItem }) => {
  console.log("Item rendered for:", story.title);
  return (
    <div key={story.objectID}>
      <h3>
        <a href={story.url} target="_blank" rel="noopener noreferrer">
          {story.title}
        </a>
      </h3>
      <p>
        By: {story.author} | Points: {story.points} | Comments: {story.num_comments}
      </p>
      <button onClick={() => onRemoveItem(story.objectID)}>
        Delete
      </button>
    </div>
  );
};

const List = ({ stories, onRemoveItem }) => {
  console.log("List rendered");
  return (
    <div>
      {stories.map((story) => (
        <Item 
          key={story.objectID} 
          story={story} 
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
};

const InputWithLabel = ({ id, children, value, onInputChange, type = "text" }) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const Header = () => {
  console.log("Header rendered");
  return (
    <header>
      <h1>Hacker News Style News Feed</h1>
    </header>
  );
};

const App = () => {
  console.log("App rendered");
  
  const [searchTerm, setSearchTerm] = useState(() => {
    const savedSearch = localStorage.getItem("search");
    return savedSearch || '';
  });
  
  const [fetchedStories, setFetchedStories] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [url, setUrl] = useState('');
useEffect(() => {
  if (url === '') {
    setFetchedStories([]);
    setIsError(false);
    return;
  }
  
  setIsLoading(true);
  setIsError(false);
  
  console.log("Fetching:", url);
  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data received:", data);
      setFetchedStories(data.hits || []);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      setIsError(true);
      setIsLoading(false);
    });
}, [url]); 
 
  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    console.log("handleSearch - about to set state:", newSearchTerm);
    setSearchTerm(newSearchTerm);
  };
  const handleSubmit = () => {
  if (searchTerm.trim() !== '') {
    setUrl(`${API_BASE_URL}${searchTerm}`);
  }
};

  
  const handleRemoveStory = (objectID) => {
    const newStories = fetchedStories.filter((story) => story.objectID !== objectID);
    setFetchedStories(newStories);
  };
  
  return (
    <div>
      <Header />
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <button disabled={searchTerm.trim() === ''} onClick={handleSubmit}>Submit</button>
      <p>You are searching for: <strong>{searchTerm}</strong></p>
      {isError && <p style={{ color: 'red' }}>Something went wrong. Please try again.</p>}

 {isLoading ? (
  <p>Loading stories...</p>
) : (
  <List stories={fetchedStories} onRemoveItem={handleRemoveStory} />
)}
    </div>
  );
};

export default App;
// Why use useEffect for fetching?
// Because fetching data is a side effect. It doesn't happen during rendering.
// useEffect runs after the component renders and can sync with external APIs.
//
// What is the difference between loading and error state?
// Loading state shows that something is in progress. Error state shows that something went wrong.
// They are different UI states that tell the user what's happening.
//
// Why control when fetching happens?
// Fetching on every keystroke wastes API calls and can be slow.
// Letting the user click Submit gives them control and reduces unnecessary requests.