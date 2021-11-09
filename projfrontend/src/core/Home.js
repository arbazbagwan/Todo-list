import Base from './Base';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useEffect, useState } from 'react';
import { createTodo, getTodo, deleteTodo, test  } from '../core/helper/apicalls';
import Sidebar from "./Sidebar";
import { Redirect } from "react-router-dom";



export default function Home() {



    const [values, setValues] = useState({
        title:"",
        description:"",
        success:false,
        error:"",
        list:[]
    });
    const [sdate, setStartDate] = useState(new Date());

    const {title, description, list} = values;

    const preload = () => {
        getTodo().then(data => {
          console.log(data);
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({ ...values, list: data});
          }
        });
      };

      useEffect(() => {
        preload();
      }, []);

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };


    const deleteList = (userId) =>{
        deleteTodo(userId)
        .then(data => {
            if(data.error){
                console.log("ERROR IN DEL")
            }
            else{
                console.log("DELETED")
        preload();

            }
        })
        .catch(error => console.log("ERROR IN DELETING"))
    }

    const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createTodo({ title, description, sdate })
      .then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
          setValues({
            ...values,
            title:"",
            description:"",
            success:false,
            error:""
          });
        preload();

        }
      })
      .catch(e=>{
        console.log("Error in adding todo");
      });
    }

    

    const Todofrom = () => {
        return (
            <div className="h-full flex items-center justify-center font-sans w-full pb-8">
                <div className="screen m-4 w-full lg:w-4/4 lg:max-w-lg">
                    <div className="mb-4 border-b pb-4 border-t border-black">
                        <h1 className="text-grey-darkest text-center p-10 font-mono md:ui-monospace text-lg">Todo List</h1>
                        <div className="flex mt-4">
                            <input className=" appearance-none focus outline-none w-full py-2 px-3 mr-4 text-grey-darker font-mono font-family: ui-monospace text-3xl" placeholder="Title" 
                            value={title} onChange={handleChange("title")}/>
                        </div>
                        <div className="flex mt-4">
                            <input className=" appearance-none outline-none w-full py-2 px-3 mr-4 text-grey-darker font-mono font-family: ui-monospace text-xl" placeholder="Description" 
                            value={description} onChange={handleChange("description")}/>
                        </div>
                        <div className="h-full w-full pt-4 pb-4 ml-3">
                        <DatePicker selected={sdate} onChange={(date) => setStartDate(date)} dateFormat="MM/dd/yyyy" className=" font-mono font-family: ui-monospace"/>
                        </div>
                        <div className="flex mt-4 ml-3">
                            <button 
                            onClick={onSubmit}
                            className="flex-no-shrink pt-1 pb-1 border-2 rounded hover:bg-green-500 pl-6 pr-6"><i class="fa fa-plus" aria-hidden="true"></i></button>
                        </div>
                    </div>

                    {list &&
                    list.map((cate, index) => (
                        <div className="flex mb-4 items-center mt-8  bg-yellow-300 rounded">
                    <p className="w-full p-4 font-mono font-family: ui-monospace" key={index} value={cate._id}> {cate.title} <br/>  {cate.description} <br/> {new Date(cate.sdate).toDateString()}
                    <div className="pt-3">
                    <button onClick={() => deleteList(cate._id)} 
                    className="flex-no-shrink pt-1 pb-1 ml-2 border-2 rounded hover:bg-red-600 pl-6 pr-6"><i class="fa fa-trash" aria-hidden="true" ></i></button>
                    
                    </div>
                    </p>
                    </div>


                    ))}

                </div>
            </div>
        )
    }

    return (
        <Base title="A Todo App" description="Manage your events at one place">
            {Todofrom()}

          <Sidebar />
        </Base>
    )
}


