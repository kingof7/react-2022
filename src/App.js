// import logo from './logo.svg';
import './App.css';

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Header(props) { // props: 속성
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault(); // a태그 기본동작 막음
      props.onChangeMode();      
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props) {
  const lis = []
  for(let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=> {
        event.preventDefault();
        props.onChangeMode(event.target.id); //event.target = 이벤트를 유발시킨 태그 = a태그
      }}>{t.title}</a>
    </li>)
  }
    return <nav>
      <ol>
        {lis}
      </ol>
    </nav>
}
function App() {
  const topics = [
    {id: 1, title: 'html', body: 'html is ...'}
   ,{id: 2, title: 'css', body: 'css is ...'}
   ,{id: 3, title: 'js', body: 'js is ...'}
  ]; 
  return (
    <div>
      <Header title="REACT" onChangeMode={()=>{
        alert('header!');
      }}/>
      <Nav topics={topics} onChangeMode={(id)=>{
        alert(id);
      }}/>
      <Article title="Welcome" body="Hello, WEB" />
      <Article title="Welcome2" body="Hello, WEB2" />
    </div>
  );
}

export default App;
