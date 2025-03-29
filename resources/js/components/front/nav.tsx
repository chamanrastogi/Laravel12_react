export default function Nav() {
    return (
        <div >
            <nav className="navbar navbar-custom d-flex flex-column">
                <div className="d-flex justify-content-between w-100 p-2">
                    <span className="d-flex flex" id="logo">
                        <span className="version mt-4">10.0 beta</span>
                    </span>

                    <div className="flex">
                        <span>
                            Welcome, <strong>Demo-Account</strong>
                        </span>
                        <button className="icon-btn">
                            <i className="fa fa-star"></i>
                        </button>
                        <button className="icon-btn">
                            <i className="fa fa-user"></i>
                        </button>
                        <button className="icon-btn">
                            <i className="fa fa-question"></i>
                        </button>
                        <button className="icon-btn">
                            <i className="fa fa-cog"></i>
                        </button>
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-0 text-white">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="priceTracker" role="button" data-bs-toggle="dropdown">
                                    Price & Seller Tracker
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Account Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Matched Accounts
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Unmatched Sellers
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="productTracker" role="button" data-bs-toggle="dropdown">
                                    Product Tracker
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Market Share Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Website Specifics
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Top Seller Tracker
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Top Content Tracker
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Content Creation
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Prospect Tracker
                                </a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link active" href="#">
                                    Content Management
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="researchTracker" role="button" data-bs-toggle="dropdown">
                                    Research Trackers
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Accent Table Tracker
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Ceiling Fan Tracker
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
