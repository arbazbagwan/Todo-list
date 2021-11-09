import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <div class="h-50 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 font-mono font-family: ui-monospace">
                <div class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between pl-5">
                    <ul class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
                        <li class="mr-3 flex-1">
                            <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-black no-underline hover:text-black border-b-2 border-black-600">
                                <i class="fas fa-chart-area pr-0 md:pr-3 text-black"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-black md:text-black block md:inline-block">Today</span>
                            </a>
                        </li>
                        <li class="mr-3 flex-1">
                            <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-black no-underline hover:text-black border-b-2 border-black-600">
                                <i class="fas fa-chart-area pr-0 md:pr-3 text-black"></i><span class="pb-1 md:pb-0 text-sm md:text-base text-black md:text-black block md:inline-block">Upcoming</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
