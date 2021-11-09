import { useEffect, useState } from "react";
import Base from "./Base";
import { getallTodo, deleteTodo } from "../core/helper/apicalls";
import Sidebar from "./Sidebar";

export default function Home() {

    const [values, setValues] = useState({
        upcominglist:"",
        error: ""
    })
    
    const {upcominglist, error} = values;
    
    const preload = () => {
        getallTodo().then(data => {
          console.log(data);
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({ ...values, upcominglist: data});
          }
        });
      };
    
    
    useEffect(() => {
        preload();
      }, []);

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

    
    return (
            <Base title="A Todo App" description="Upcoming Events">
                     <div className="h-full flex items-center justify-center font-sans pb-8" >
                        <div className="screen m-4 w-full lg:w-4/4 lg:max-w-lg">
                            <div className="mb-4">
                                <h1 className="text-grey-darkest text-center p-10 font-mono md:ui-monospace text-lg">Todo List</h1>
                            </div>
                            {upcominglist &&
                    upcominglist.map((cate, index) => (
                        <div className="flex mb-4 items-center mt-8 border bg-yellow-300 rounded">
                    <p className="w-full p-4" key={index} value={cate._id}> {cate.title} <br/> {cate.description} <br/> {new Date(cate.sdate).toDateString()}
                    <div className="pt-3">
                    <button onClick={() => deleteList(cate._id)} 
                    className="flex-no-shrink pt-1 pb-1 ml-2 border-2 rounded hover:text-red-600 pl-6 pr-6"><i class="fa fa-trash" aria-hidden="true" ></i></button>
                    </div>
                    </p>
                    </div>
                    ))}
                        </div>
                    </div>
          <Sidebar />
            </Base>
    )
    
}