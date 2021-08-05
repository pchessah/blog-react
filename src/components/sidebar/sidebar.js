import React, { useContext } from 'react'
import firebaseConfig from '../../config';
import "./sidebar.css"
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';


import { Link } from 'react-router-dom';
import { AuthContext } from '../../Auth';

const logOut = () =>{
    if(window.confirm("Are you sure you want to log out?")){
        return firebaseConfig.auth().signOut()
    }
}


function Sidebar() {
    const { currentUser } = useContext(AuthContext)
    return (
        <div
            style={{ display: 'flex', height: '200vh', overflow: 'scroll initial' }}
        >
            <CDBSidebar textColor="white" backgroundColor="transparent">
                <CDBSidebarHeader className="sidebar-header" prefix={<i className="fa fa-bars fa-large"></i>}>
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
                            <Link to="/"> <i className="fas fa-blog"></i>Feed</Link>
                        </CDBSidebarMenuItem>

                        {/* <CDBSidebarMenuItem>
                            <Link to="/blogposts"> <i className="fas fa-blog"></i>Blog Posts</Link>
                        </CDBSidebarMenuItem> */}

                        {!currentUser ?  <CDBSidebarMenuItem>
                            <Link to="/login"> <i className="fas fa-sign-out-alt"></i>Log In</Link>
                        </CDBSidebarMenuItem> : null }


                        {!currentUser ?  <CDBSidebarMenuItem>
                            <Link to="/signup">   <i className="fas fa-user-plus"></i>Sign Up</Link>
                        </CDBSidebarMenuItem> : null }
                       


                        {currentUser ? <CDBSidebarMenuItem>
                            <Link to="/profile"> <i className="fas fa-users-cog"></i>Profile</Link>
                        </CDBSidebarMenuItem> : null
                        }

                        {currentUser ? <CDBSidebarMenuItem>
                            <i onClick={logOut} className="fas fa-user-minus text-red">&nbsp;&nbsp;&nbsp;&nbsp;Log Out</i>
                        </CDBSidebarMenuItem> : null
                        }


                    </CDBSidebarContent>

                </CDBSidebarMenu>



            </CDBSidebar>
        </div>

    )
}

export default Sidebar
