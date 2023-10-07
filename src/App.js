import logo from './logo.svg';
import './App.css';
function Header(props) { // props: 속성
  return <header>
    <h1><a href="/">{props.title}</a></h1>
  </header>
}
function Nav() {
  return <nav>
    <ol>
      <li><a href="/read/1">html</a></li>
      <li><a href="/read/2">css</a></li>
      <li><a href="/read/3">js</a></li>
    </ol>
  </nav>
}
function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function App() {
  return (
    <div>
      <Header title="REACT"/>
      <Nav />
      <Article title="Welcome" body="Hello, WEB" />
      <Article title="Welcome2" body="Hello, WEB2" />
    </div>
  );
}

export default App;
