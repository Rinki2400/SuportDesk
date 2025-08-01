import React from 'react'
import AdminNavbar from './AdminNavbar'
import TicketComp from './TicketComp'
import './AdminDashboard.css'

function AdminTicket() {
  return (
    <div className='admin-container'>
     <AdminNavbar/>
     <TicketComp/>
    </div>
  )
}

export default AdminTicket
