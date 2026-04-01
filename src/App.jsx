const courseTitle = "Frontend Development with React";

function App() {
  const studentName = "Samar Khammeri";
  const student = {
    name: "Samar Khammeri",
    age: 22,
    track: "Web Development"
  };
  function sayHello() {
  return `Hello, I'm ${studentName} and I'm learning React!`;
}
  
return (
  <div>
    <h1>Welcome to My React Journey</h1>
    <p>My name is {studentName}</p>
    <p>Course: {courseTitle}</p>
    <p>Welcome to {courseTitle}, {studentName}!</p>
    
    <label htmlFor="studentEmail">Your Email:</label>
    <input type="text" id="studentEmail" placeholder="Enter your email" />
    <h2>Student Details:</h2>
<p>Name: {student.name}</p>
<p>Age: {student.age}</p>
<p>Track: {student.track}</p>
<p>{sayHello()}</p>
  </div>
);
}

export default App;
// 1. One thing I understand well in this lab:
// I understand how to use curly braces {} to show variables inside JSX.

// 2. One thing that is still confusing:
// I still get confused about when to use parentheses after a function name.

// 3. One mistake I made and fixed:
// I accidentally named my CSS file wrong earlier (index.html.css) and had to rename it.