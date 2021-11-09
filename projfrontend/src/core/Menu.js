import { Link } from "react-router-dom";
import { signout } from "./helper/auth";

const Menu = () => {
    return(
      <nav class="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
      <div class="flex flex-wrap items-center">
          <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
              <a href="#">
                  <span class="text-xl pl-2"><i class="em em-grinning"></i></span>
              </a>
          </div>

          <div class="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
              <span class="relative w-full">
                  <input type="search" placeholder="Search" class="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal" />
                  
              </span>
          </div>

          <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
              <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
                  <li class="flex-1 md:flex-none md:mr-3">
                      <a class="inline-block py-2 px-4 text-white no-underline" href="#">Hi, User</a>
                  </li>
                  <li class="flex-1 md:flex-none md:mr-3">
                      <button onClick={() => {
              signout(() => {
                window.location.href = '/'
              });
            }}>Signout</button>
                  </li>
                  
              </ul>
          </div>
      </div>

  </nav>
    )
}


export default Menu;