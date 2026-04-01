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
function App() {
  return (
    <div>
      <h1>Hacker News Style News Feed</h1>
      
      {stories.map(function(story) {
        return (
          <div>
            <h3>
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                {story.title}
              </a>
            </h3>
            <p>
              By: {story.author} | Points: {story.points} | Comments: {story.num_comments}
            </p>
            key={story.objectID}
          </div>
        );
      })}
    </div>
  );
}

export default App;
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