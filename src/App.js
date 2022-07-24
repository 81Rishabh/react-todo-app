import { useState } from "react";
import axios from "axios";
import UseFetchApi from "./api/UseFetchApi";
import toast, { Toaster } from 'react-hot-toast';
import "./App.css";

function App() {
  const [success, setsuccess] = useState(false);
  const [value, setvalue] = useState("");
  const [title, settitle] = useState([]);
  const [id, setId] = useState(100);
  const [method, setmethod] = useState("GET");
  const [loading, setloading] = useState(false);
  // urls
  const URL = "https://jsonplaceholder.typicode.com/albums";
  const UPDATE_URL = URL;

  // use Fetch hook for fetching albums
  const albums = UseFetchApi(URL, []);


  // submit Handler
  function submitHandler(e) {
    e.preventDefault();
    if(method === "GET") {
      setId(prevState => prevState + 1);
      PostRequest("POST" , id , URL);
      settitle([value , ...title]);
    }
    else {
      PostRequest("PUT" , id , `${UPDATE_URL}/${id}`);
    }
    setvalue("");
  }

    // update todo
    function updateTodo(id) {
       var item = albums.filter(item => item.id === id);
       setId(id);
       setvalue(item[0].title);
       setmethod("PUT");
      }
      
    // delete album 
    function deleteTodo(id) {
      deleteTodoRequest(id);
    }

  // request albums
  function PostRequest(method , id , URL) {
    setloading(true);
    axios({
      method: method,
      url: URL,
      body: JSON.stringify({
        id: id,
        userId: id,
        title: value,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then(() => {
        if(method === 'POST') {
          setsuccess(true);
          setloading(false);
          showNotification("Created Successfuly");
        }
        if(method === 'PUT') {
          setmethod('GET');
          setloading(false);
          showNotification("Updated Successfuly");
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  // deletetodo request 
  function deleteTodoRequest(id) {
    setloading(true);
     axios({
       method : 'DELETE',
       url  : URL+'/'+id
     })
     .then(() => {
      setloading(false);
      showNotification("Deleted Successfuly.");
     }).catch((err) => {
        throw err;
     });
  }

  // show showNotification
  function showNotification(title) {
    toast.success(title , {
      duration:4000,
      position: 'top-center',
    });
  }



  return (
    <div className="App">
      <Toaster />

      <h1 className="heading">Albums App</h1>
      <p style={{textAlign : 'center'}}>
       {loading ? 'Loading.....' : ''}
      </p>
      <div className="add-album-container">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Write your title here..."
            onChange={(e) => setvalue(e.target.value)}
            value={value}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="album-container">
        <ul className="albums-group-list">
          {success && title.map((item , idx) => (
            <li key={idx}>
            <p>{item}</p>
            <div className="album-actions">
              <button type="button">Edit</button>
              <button type="button">Delete</button>
            </div>
          </li>
          ))}
          {albums.length > 0 &&
            albums.map((item) => (
              <li key={item.id}>
                 <p>{item.title}</p>
                <div className="album-actions">
                  <button type="button" onClick={() => updateTodo(item.id)}>Edit</button>
                  <button type="button" onClick={() => deleteTodo(item.id)}>Delete</button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
