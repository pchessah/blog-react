import React from 'react'
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
            style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
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
                            <Link to="/">Home</Link>
                        </CDBSidebarMenuItem>


                        <CDBSidebarMenuItem>
                            <Link to="/blogposts">Blog Posts</Link>
                        </CDBSidebarMenuItem>


                        <CDBSidebarMenuItem>
                            <Link to="/profile">Profile</Link>
                        </CDBSidebarMenuItem>

                    </CDBSidebarContent>

                </CDBSidebarMenu>



            </CDBSidebar>
        </div>

    )
}

export default Sidebar
