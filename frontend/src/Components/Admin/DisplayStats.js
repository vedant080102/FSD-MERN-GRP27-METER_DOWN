import { useEffect } from "react";
import { useState } from "react"
import { axiosInstance } from "../../AxiosSetUp";


export default function DisplayStats() {
    const [stats, setStats] = useState({});

    const getAllStats = () => {
        axiosInstance.get('http://localhost:3001/api/admin/getStats')
        .then((doc)=> {
            console.log(doc.data);
            setStats(doc.data);
        }).catch(e => console.log(e))
    }

    useEffect(()=> getAllStats(), [1]);

    return (
        <div className="container rounded bg-white px-1 px-md-2 py-3 my-2">
            <h2 className="fw-bold">Statistics</h2>
            <div className="row d-flex justify-content-evenly my-4 mx-0 w-100">
                <div className="admin-stats col-10 col-md-4 my-3 mx-md-3 mw-100 p-4 rounded border">
                    <div className="row">
                        <div className="col-4 flex fs-2"><i class="fas fa-taxi"></i></div>
                        <div className="col-8 flex flex-column">
                            <span>Total Rides</span>
                            <span>{stats ? stats.ridesCount: '-'}</span>
                        </div>
                    </div>
                </div>
                <div className="admin-stats col-10 col-md-4 my-3 mx-md-3 mw-100 p-4 rounded border">
                    <div className="row">
                        <div className="col-4 flex fs-2"><i class="fas fa-check-circle"></i></div>
                        <div className="col-8 flex flex-column">
                            <span>Completed Rides</span>
                            <span>{stats ? stats.completedRidesCount: '-'}</span>
                        </div>
                    </div>
                </div>
                <div className="admin-stats col-10 col-md-4 my-3 mx-md-3 mw-100 p-4 rounded border">
                    <div className="row">
                        <div className="col-4 flex fs-2"><i class="fas fa-business-time"></i></div>
                        <div className="col-8 flex flex-column">
                            <span>Ongoing Rides</span>
                            <span>{stats ? stats.ongoingRidesCount: '-'}</span>
                        </div>
                    </div>
                </div>
                <div className="admin-stats col-10 col-md-4 my-3 mx-md-3 mw-100 p-4 rounded border">
                    <div className="row">
                        <div className="col-4 flex fs-2"><i class="fas fa-users"></i></div>
                        <div className="col-8 flex flex-column">
                            <span>Total Users</span>
                            <span>{stats ? stats.usersCount: '-'}</span>
                        </div>
                    </div>
                </div>
                <div className="admin-stats col-10 col-md-4 my-3 mx-md-3 mw-100 p-4 rounded border">
                    <div className="row">
                        <div className="col-4 flex fs-2"><i class="fas fa-user-friends"></i></div>
                        <div className="col-8 flex flex-column">
                            <span>Number of Customers</span>
                            <span>{stats ? stats.passengerCount: '-'}</span>
                        </div>
                    </div>
                </div>
                <div className="admin-stats col-10 col-md-4 my-3 mx-md-3 mw-100 p-4 rounded border">
                    <div className="row">
                        <div className="col-4 flex fs-2"><i class="fas fa-user-tie"></i></div>
                        <div className="col-8 flex flex-column">
                            <span>Number of drivers</span>
                            <span>{stats ? stats.driverCount: '-'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}