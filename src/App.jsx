
import { useState, useEffect } from 'react';
const Item = ({ story }) => {
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
    </div>
  );
};
const List = ({ stories }) => {
  console.log("List rendered");
  return (
    <div>
      {stories.map((story) => (
        <Item key={story.objectID} story={story} />
      ))}
    </div>
  );
};
const Search = ({ onSearch, searchTerm }) => {
  console.log("Search rendered");
  const handleInput = (event) => {
    console.log("User is typing:", event.target.value);
    console.log("Input value:", event.target.value);
    console.log("Event type:", event.type);
    onSearch(event);
  };

  return (
    <>
      <label htmlFor="search">Search:</label>
    <input 
  type="text" 
  id="search" 
  placeholder="Search stories..." 
  onChange={handleInput}
  value={searchTerm}
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
useEffect(() => {
  console.log("useEffect ran - saving to localStorage:", searchTerm);
  localStorage.setItem("search", searchTerm);
}, [searchTerm]);
   const handleSearch = (event) => {
  const newSearchTerm = event.target.value;
  console.log("handleSearch - about to set state:", newSearchTerm);
  setSearchTerm(newSearchTerm);
};
   const stories = [
  {
    objectID: 1,
    title: "React 19 Released with New Features",
    url: "https://react.dev/blog/2024/12/05/react-19",
    author: "react-team",
    points: 500,
    num_comments: 89
  },
  {
    objectID: 2,
    title: "GitHub Copilot Gets Better at Understanding Context",
    url: "https://github.blog/news/copilot-update",
    author: "github-engineering",
    points: 278,
    num_comments: 45
  },
  { 
    objectID: 3,
    title: "VS Code Update: Better Git Integration",
    url: "https://code.visualstudio.com/updates",
    author: "vscode-team",
    points: 156,
    num_comments: 34
  }
];
   const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
return (
    <div>
      <Header />
    <Search onSearch={handleSearch} />
    <p>You are searching for: <strong>{searchTerm}</strong></p>
    <List stories={filteredStories} />
    </div>
  );
};

export default App;
// What is a controlled component?
// A controlled component is when React controls the input's value through state.
// The value comes from props/state, not from the DOM. In my app, the search input
// gets its value from searchTerm state and updates when setSearchTerm is called.
//
// What is a side effect in React?
// A side effect is anything that affects something outside the React component.
// Examples from my app: saving to localStorage, console.log statements.
// Side effects should not happen during rendering, which is why we use useEffect.
//
// Why do we use useEffect instead of calling code directly?
// If I called localStorage.setItem directly inside the component body, it would run
// on every render, even when searchTerm hasn't changed. useEffect lets me control
// when it runs by using a dependency array. It also runs after the browser paints,
// so it doesn't slow down the UI.