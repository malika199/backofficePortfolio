import React from "react";

import Link from "next/link";

function Navbar(props) {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary ml-2 mr-2">
        <div class="container-fluid ml-2 mr-2">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
           
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="/experience"
                >
                  Experience
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active"  aria-current="page" href="/skill">
                  Skill
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
