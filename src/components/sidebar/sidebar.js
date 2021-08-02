import React from 'react'
import "./sidebar.css"
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';

import { Link } from 'react-router-dom';


function Sidebar() {
    return (
        <div
            style={{ display: 'flex', height: '200vh', overflow: 'scroll initial' }}
        >
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <Link
                        to="/"
                        className="text-decoration-none"
                        style={{ color: 'inherit' }}
                    >
                        Chessah Blog
                    </Link>

                </CDBSidebarHeader>
                < CDBSidebarMenu>
                    <CDBSidebarContent>
                        <CDBSidebarMenuItem>                       
                            <Link to="/"> <i className="fas fa-home"></i>Home</Link>
                        </CDBSidebarMenuItem>

                        <CDBSidebarMenuItem>                       
                            <Link to="/blogposts"> <i className="fas fa-blog"></i>Blog Posts</Link>
                        </CDBSidebarMenuItem>

                        <CDBSidebarMenuItem>                       
                            <Link to="/login"> <i className="fas fa-sign-out-alt"></i>Log In/Sign Up</Link>
                        </CDBSidebarMenuItem>


                        <CDBSidebarMenuItem>                       
                            <Link to="/profile"> <i className="fas fa-user-circle"></i>Profile</Link>
                        </CDBSidebarMenuItem>

                    </CDBSidebarContent>

                </CDBSidebarMenu>



            </CDBSidebar>
        </div>

    )
}

export default Sidebar
