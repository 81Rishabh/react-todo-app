import {useState , useEffect} from 'react';
import axios from 'axios';

function UseFetchApi(URL , initState) {
    const [data, setdata] = useState(initState);
    useEffect(() => {
        axios({
          method: "GET",
          url: URL,
         })
          .then((result) => {
            setdata(result.data);
          })
          .catch((err) => {
            throw err;
          });
      }, [URL]);
    return data;  
}

export default UseFetchApi;