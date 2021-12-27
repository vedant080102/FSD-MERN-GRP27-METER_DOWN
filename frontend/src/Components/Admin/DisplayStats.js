export default function DisplayStats() {
    return (
        <div className="container rounded bg-white px-1 px-md-2 py-3">
            <h2 className="fw-bold">Statistics</h2>
            <div className="row flex my-4 mx-0 w-100">
                <div className="admin-stats col-10 col-md-4 my-2 mx-md-3 mw-100 p-4 rounded border">
                    <div className="row">
                        <div className="col-4 flex fs-2"><i class="fas fa-taxi"></i></div>
                        <div className="col-8 flex flex-column">
                            <span>total rides</span>
                            <span>1000</span>
                        </div>
                    </div>
                </div>
                <div className="admin-stats col-10 col-md-4 my-2 mx-md-3 mw-100 p-4 rounded border">
                    <div className="row">
                        <div className="col-4 flex fs-2"><i class="fas fa-biking"></i></div>
                        <div className="col-8 flex flex-column">
                            <span>completed rides</span>
                            <span>1000</span>
                        </div>
                    </div>
                </div>
                <div className="admin-stats col-10 col-md-4 my-2 mx-md-3 mw-100 p-4 rounded border">
                    <div className="row">
                        <div className="col-4 flex fs-2"><i class="fas fa-business-time"></i></div>
                        <div className="col-8 flex flex-column">
                            <span>ongoing rides</span>
                            <span>1000</span>
                        </div>
                    </div>
                </div>
                <div className="admin-stats col-10 col-md-4 my-2 mx-md-3 mw-100 p-4 rounded border">
                    <div className="row">
                        <div className="col-4 flex fs-2"><i class="fas fa-users"></i></div>
                        <div className="col-8 flex flex-column">
                            <span>no of customers</span>
                            <span>1000</span>
                        </div>
                    </div>
                </div>
                <div className="admin-stats col-10 col-md-4 my-2 mx-md-3 mw-100 p-4 rounded border">
                    <div className="row">
                        <div className="col-4 flex fs-2"><i class="fas fa-user-friends"></i></div>
                        <div className="col-8 flex flex-column">
                            <span>no of users</span>
                            <span>1000</span>
                        </div>
                    </div>
                </div>
                <div className="admin-stats col-10 col-md-4 my-2 mx-md-3 mw-100 p-4 rounded border">
                    <div className="row">
                        <div className="col-4 flex fs-2"><i class="fas fa-user-tie"></i></div>
                        <div className="col-8 flex flex-column">
                            <span>no of drivers</span>
                            <span>1000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}