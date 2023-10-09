// import logo from './logo.svg';
import {useState} from 'react';
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
        props.onChangeMode(Number(event.target.id)); //event.target = 이벤트를 유발시킨 태그 = a태그
      }}>{t.title}</a>
    </li>)
  }
    return <nav>
      <ol>
        {lis}
      </ol>
    </nav>
}
function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title 입력"/></p>
      <p><textarea name="body" placeholder="body 입력"></textarea></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p>
        <input type="text" name="title" placeholder="title 입력" value={title} onChange={event => {
          setTitle(event.target.value);
        }}/>
      </p>
      <p>
        <textarea name="body" placeholder="body 입력" value={body} onChange={event => {
          setBody(event.target.value);
        }}></textarea>
      </p>
      <p><input type="submit" value="Update" /></p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME'); // destructering
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id: 1, title: 'html', body: 'html is ...'}
    ,{id: 2, title: 'css', body: 'css is ...'}
    ,{id: 3, title: 'js', body: 'js is ...'}
  ]);
  let content = null;
  let contextControl = null;
  if(mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB" />
  }else if(mode === 'READ') {
    let title, body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />
    contextControl = <><li><a href={'/update/'+id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
    <li><input type="button" value="Delete" onClick={()=>{
      const newTopics = [];
      for(let i=0; i<topics.length; i++) {
        if(topics[i].id !== id) {
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode('WELCOME');
    }} /></li>
    </>
  }else if(mode === 'Create') {
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id: nextId, title: _title, body: _body};
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId); // id에 4를 넣고
      setNextId(nextId + 1); // nextId에 5를 넣음
    }} />
  }else if(mode === 'UPDATE') {
    // let title = topics[id-1].title;
    // let body = topics[id-1].body;
    let title, body = null;
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const updatedTopic = {id: id, title: title, body: body}
      const newTopics = [...topics];
      // newTopics[id-1] = updatedTopic;
      for(let i=0; i<newTopics.length; i++) {
        if(newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }} />
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }} />
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id)
      }} />
      {content}
      <ul>
        <li>
          <a href="/create" onClick={event=>{
            event.preventDefault();
            setMode('Create');
          }}>Create</a>
          {contextControl}
        </li>
      </ul>
    </div>
  );
}

export default App;