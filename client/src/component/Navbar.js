import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import $ from 'jquery';
import logo from './travel logo.png';
// import Search_bar from './Search_bar';

function Onhandle() {
    if ($('body').hasClass('closed-menu')) {
      $('body').removeClass('closed-menu');
    } else {
      $('body').addClass('closed-menu');
    }
  }

const Navbar = () => {
    return (
        <>

            <nav class="vertical-menu-wrapper">
                <div class="vertical-menu-logo">
                    <div>LOGO</div>
                    <span class="open-menu-btn" onClick={Onhandle}>
                        <hr/>
                        <hr/>
                        <hr/>
                    </span>
                </div>
                <ul class="vertical-menu">
                    <li>Schedule</li>
                    <li>Event</li>
                    <Link />
                    <li>Setting</li>
                    <li>Privacy</li>
                    <li id="user-info">MJ<span>online</span></li>
                </ul>
            </nav>
            <div class="content-wrapper">
                <div class="content">
                </div>
            </div>
        </>
    )
}

export default Navbar
