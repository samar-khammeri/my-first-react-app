// Step 1: Understanding the data structure
// Each news story needs:
// - title: the article headline
// - url: link to read the full story
// - author: who wrote it
// - objectID: unique ID (this will be our React key)
// - points: how many upvotes
// - num_comments: how many people commented
//
// Which property should be the React key?
// objectID is the best choice because it's guaranteed unique.
//
// Why is this realistic for an API?
// APIs return data in this structured format with consistent properties.

import { useState } from 'react';
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
const Search = ({ onSearch }) => {
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
  const [searchTerm, setSearchTerm] = useState('');
   const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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
// lab 3 //
// Why is map() essential for rendering lists in React?
// map() goes through each item in the array and returns JSX. 
// I tried using forEach() first but nothing showed up on the page.
//
// Why is objectID the correct key?
// objectID is unique for each story. If I used the index, 
// things might break if I add or delete stories later.
//
// What will change when we replace fake data with the Hacker News API?
// Instead of having the data hardcoded, we'll fetch it from a URL.
// I'll need to use useState and useEffect to load it when the page loads.

// lab 4 //
// What does App do now?
// App is like the main layout. It puts the Header, Search, and List components together.
//
// What does List do?
// List handles only the stories. It loops through them and displays each one.
//
// What does Search do?
// Search only shows the search bar. It doesn't do any filtering yet.
//
// Why is this structure cleaner than before?
// Before, everything was inside App and it was getting long. Now each component
// has one job. If something breaks with the stories, I know to look in List.
// If something breaks with the search, I know to look in Search.

// lab 5 //
// When do we use concise body arrow functions?
// When the function only returns something with no extra logic.
//
// When do we use block body arrow functions?
// When we need to add logic, variables, or multiple lines.
//
// What does an event object contain?
// It has information about what happened, like target (the input), value, type, etc.

// lab 6 //
// What is the difference between props and state?
// Props are data passed from a parent component to a child. The child cannot change props.
// State is data that belongs to a component. The component can change its own state using setState.
//
// Why do we lift state up?
// When two or more components need access to the same data, we move that data to their closest common parent.
// Then we pass it down as props. This keeps everything in sync.
//
// Where should filtering logic live?
// Filtering should live where the data and the search term both exist. In my app, that's App.
// App owns the stories array and the searchTerm state, so it filters before passing to List.