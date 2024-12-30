import "../css/home.css"
import {Button, Form} from "react-bootstrap";
import {useContext, useState} from "react";
import {HangmanContext} from "./HangmanContext";
import {useNavigate} from "react-router-dom";

function Home(){

 
    const [name, setName] = useState("")
    const {setGlobalName} = useContext(HangmanContext);

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(name.trim()){
            setGlobalName(name);
            setName("");
            navigate("/gamepage")
        }
    }

    return(

        <div className="myContainer">
            <Form className="myForm d-flex align-items-center  flex-column gap-2
            " style={{paddingTop:"20vh"}} onSubmit={handleSubmit}>
                <Form.Label className=" fw-bold fs-3" style={{color:"white"}} >Write your name please!</Form.Label>
                <Form.Control
                    placeholder="Name"
                    type="text"
                    className="w-50"
                    minLength={2}
                    maxLength={20}
                    pattern="[A-Za-z]+"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <Button style={{color:"white"}} className="w-25 btn btn-outline-danger bg-transparent
                fs-4 fw-bold " type="submit">Let's Go</Button>
            </Form>

        </div>

    )

}
export default Home;