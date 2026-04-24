
import { useState, useEffect } from 'react';
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
  
  useEffect(() => {
    console.log("useEffect ran - saving to localStorage:", searchTerm);
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);
  
  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    console.log("handleSearch - about to set state:", newSearchTerm);
    setSearchTerm(newSearchTerm);
  };
  
  const initialStories = [
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
  
  const [stories, setStories] = useState(initialStories);
  
  const handleRemoveStory = (objectID) => {
    const newStories = stories.filter((story) => story.objectID !== objectID);
    setStories(newStories);
  };
  
  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
      <p>You are searching for: <strong>{searchTerm}</strong></p>
      <List stories={filteredStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

export default App;
// What makes a component reusable?
// A component is reusable when it uses generic props instead of domain-specific names.
// For example, InputWithLabel uses "value" and "onInputChange" instead of "searchTerm" and "onSearch".
//
// What is component composition?
// Composition is when you pass content inside a component's tags using the children prop.
// Example: <InputWithLabel><strong>Search:</strong></InputWithLabel>
//
// Why do we pass handlers down the component tree?
// Because state lives in the parent component (App), but the action (clicking Delete)
// happens in a child component (Item). The child needs a way to tell the parent to update state.