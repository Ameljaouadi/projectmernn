import React ,{useState} from 'react';
import { Input } from 'antd';
import { json } from 'react-router-dom';


const App = () => {
    const {input, setInput} = useState("")

    const fetchData = (value) => {
        fetch('')
        .then((Response) => Response.json())
        .then((json) => {
            const results = json.filter((patient) => {
                return (
                    value && 
                    patient &&
                    patient.name &&
                    patient.name.toLowerCase().includes(value)
                );
            });
            console.log(results);
        });

    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }
return (
    <div className='input-wrapper'> 
      <Input placeholder="Chercher..."
      value={input}
      onChange={(e) => ha(e.target.value)} />;
    </div>
)
};
export default App;