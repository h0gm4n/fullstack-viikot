
const Course = ({ course }) => {

    const Header = ({ course }) => <h2>{course}</h2>
  
    const Part = ({ part }) => 
      <p>
        {part.name} {part.exercises}
      </p>
  
    const Content = ({ parts }) => 
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      </div>
  
    var exearray = []
    for (let i = 0; i < course.parts.length; i++) {
      console.log(exearray.push(course.parts[i].exercises))
    }
  
    const initialValue = 0;
    const sumWithInitial = exearray.reduce(
      (p, c) => p + c,
      initialValue
    );
  
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <b>total of {sumWithInitial} exercises</b>
      </div>
    )
  }


  export default Course