import Base from './Base';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { Fragment, useRef, useEffect, useState } from 'react';
import { createTodo, getTodo, deleteTodo, geteditTodo, updatetodolist } from '../core/helper/apicalls';
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import { Dialog, Transition } from '@headlessui/react'
import moment from 'moment';



export default function Home() {

  var belongsto = localStorage.getItem("name");

  const [open, setOpen] = useState(false)
  const { opens } = open;

  const cancelButtonRef = useRef(null)


  const [values, setValues] = useState({
    title: "",
    description: "",
    success: false,
    error: "",
    list: [],
    edittodo:[],
    etitle:"",
    edescription:"",
    eid:"",
  });

  const [sdate, setStartDate] = useState(new Date());
  const [edate, editStartDate] = useState(new Date());


  const { title, description, list, etitle, edescription, edittodo, eid } = values;

  const preload = () => {
    getTodo(belongsto).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, list: data });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };


  const deleteList = (userId) => {
    deleteTodo(userId)
      .then(data => {
        if (data.error) {
          console.log("ERROR IN DEL")
        }
        else {
          console.log("DELETED")
          preload();

        }
      })
      .catch(error => console.log("ERROR IN DELETING"))
  }



  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createTodo({ title, description, sdate, belongsto })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            title: "",
            description: "",
            success: false,
            error: ""
          });
          preload();

        }
      })
      .catch(e => {
        console.log("Error in adding todo");
      });
  }



  const Todofrom = () => {
    return (
      <div className="h-full flex items-center justify-center font-sans w-full pb-8">
        <div className="screen m-4 w-full lg:w-4/4 lg:max-w-lg">
          <div className="mb-4 border-b pb-4 border-t border-black">
            <h1 className="text-grey-darkest text-center p-10 font-sans font-family: -apple-system text-lg">Todo List</h1>
            <div className="flex mt-4">
              <input className=" appearance-none focus:outline-none focus:ring focus:border-blue-300 rounded w-full py-2 px-3 mr-4 text-grey-darker font-mono font-family: ui-monospace text-xl" placeholder="Title"
                value={title} onChange={handleChange("title")} />
            </div>
            <div className="flex mt-4">
              <input className=" appearance-none focus:outline-none focus:ring focus:border-blue-300 rounded w-full py-2 px-3 mr-4 text-grey-darker font-mono font-family: ui-monospace text-xl" placeholder="Description"
                value={description} onChange={handleChange("description")} />
            </div>
            <div className="h-full w-full pt-4 pb-4 ml-3">
              <DatePicker selected={sdate} onChange={(date) => setStartDate(date)} dateFormat="MM/dd/yyyy" className="focus:outline-none focus:ring focus:border-blue-300 rounded font-mono font-family: ui-monospace text-xl" />
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
                <p className="w-full p-4 font-mono font-family: ui-monospace" key={index} value={cate._id}> {cate.title} <br />  {cate.description} <br />
                  {new Date(cate.sdate).toDateString()}
                  <div className="pt-3">
                    <button onClick={() => deleteList(cate._id)}
                      className="flex-no-shrink pt-1 pb-1 ml-2 border-2 rounded hover:bg-red-600 pl-6 pr-6"><i class="fa fa-trash" aria-hidden="true" ></i></button>
                    {/* edit button */}
                    <button type="button" className="flex-no-shrink pt-1 pb-1 ml-2 border-2 rounded hover:bg-pink-600 pl-6 pr-6"
                      onClick={() => {setOpen(true); showedit(cate._id)}}
                    ><i class="fas fa-edit"></i>
                    </button>
                    {/* {---------} */}
                  </div>
                </p>
              </div>


            ))}

        </div>
      </div>
    )
  }

  const showedit = (todoid) => {
    geteditTodo(todoid)
    .then(data => {
      if(data.error){
        console.log("error in getting to react")
      }
      else{
        setValues({...values, edittodo: data, etitle: data[0].title, edescription: data[0].description, edate: data[0].sdate, eid: data[0]._id});
        console.log(data[0].title);
      }
    })
    .catch(err => console.log(err))
  }

  const edittodolist = (eupdateid) =>{
    var title = etitle;
    var description = edescription;
    var sdate = edate;
    updatetodolist(eupdateid, {title, description, sdate})
    .then(data => {
      if(data.error){
        console.log("error to update the todo list")
      }
      else{
        console.log("edited");
        preload();
      }
    })
    .catch(err => console.log(err))
  }

  const popup = () => {
    return (
      <div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className=" inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 pb-3">
                          Edit
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="mb-4 pb-11">
                                <div>
                                <div className="flex mt-4">
                              <input className=" appearance-none focus:outline-none focus:ring focus:border-blue-300 rounded w-full py-2 px-3 mr-4 text-grey-darker font-mono font-family: ui-monospace text-xl" placeholder="Title"
                                value={etitle} onChange={handleChange("etitle")} />
                            </div>
                            <div className="flex mt-4">
                              <input className=" appearance-none focus:outline-none focus:ring focus:border-blue-300 rounded w-full py-2 px-3 mr-4 text-grey-darker font-mono font-family: ui-monospace text-xl" placeholder="Description"
                                value={edescription} onChange={handleChange("edescription")} />
                            </div>
                            <div className="h-full w-full pt-4 pb-11 ml-3">
                              <DatePicker selected={moment(edate).toDate()} onChange={(edate) => editStartDate(edate)}  className="focus:outline-none focus:ring focus:border-blue-300 rounded font-mono font-family: ui-monospace text-xl" />
                            </div>
                            <div className="flex mt-4 ml-3 pb-14">
                            </div>
                            </div>
                             
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {setOpen(false); edittodolist(eid)}}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    )
  }



  return (
    <Base title="A Todo App" description="Manage your events at one place">
      <Menu />

      {Todofrom()}
      {popup()}
      <Sidebar />

    </Base>
  )
}


