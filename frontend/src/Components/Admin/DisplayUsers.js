import { useEffect, useState } from "react";
import { axiosInstance } from "../../AxiosSetUp"
import MyModal from "../Base/MyModal";

export default function DisplayUsers () {

    const [passenger, setPassenger] = useState([]);
    const [drivers, setdrivers] = useState([]);
    const [allUsers, setallUsers] = useState([]);

    const [displayMsg, setdisplayMsg] = useState();
	const [modalShow, setModalShow] = useState(false);

    const getUserDetails = async () => {
        await axiosInstance.get('http://localhost:3001/api/admin/allPassengers')
        .then(doc => {
            console.log("data", doc.data);
            var d = doc.data;
            var data = [];
            d.forEach(element => {
                element.account && data.push({
                    id: element._id,
                    email: element.account.email,
                    isVerified: element.account.isVerified,
                    name: element.account.name,
                    password: element.account.password,
                    phone: element.account.phone,
                    type: element.account.type,
                })
            })
            console.log("cleaned data", data);
            setPassenger(data);
        })
        await axiosInstance.get('http://localhost:3001/api/admin/allDrivers')
        .then(doc => {
            console.log("data", doc.data);
            var d = doc.data;
            var data = [];
            d.forEach(element => {
                element.account && data.push({
                    id: element._id,
                    email: element.account.email,
                    isVerified: element.account.isVerified,
                    name: element.account.name,
                    phone: element.account.phone,
                    type: element.account.type,
                    driverData: {
                        approved: element.approved, //false
                        busy: element.busy, //true,
                        carPhoto: element.carPhoto, //(4) ['http://drive.google.com/uc?export=view&id=1pA-6LFJXryuc82Aj5xybYoIvASzVGZta', 'http://drive.google.com/uc?export=view&id=1yce-pWgPRd2Eb2MPYrrg2z25TRw6Hl22', 'http://drive.google.com/uc?export=view&id=1CKi0j4NyUVBw1Z0kHZQE2_7aNfw45YYq', 'http://drive.google.com/uc?export=view&id=1-_D_lHC_3mcV49h1yasfx9gv743g0Y-y']
                        carPhotoLastUpdated: element.carPhotoLastUpdated, //"2021-11-30T19:59:13.723Z"
                        driverPhoto: element.driverPhoto, //"http://drive.google.com/uc?export=view&id=1q6SkREqr1Q2W1sOuRNKFhMOgNfqxU_4k"
                        futureFares: element.futureFares, //[]
                        liscence: element.liscence, //"http://drive.google.com/uc?export=view&id=1ntcao0VUBDrKQ5ERI3H_3STPiJHVq9Le"
                        location: element.location, //{lat: 19.189151762004496, lng: 72.94283913125471}
                        ongoingFare: element.ongoingFare, //"61ca17cea017b9c8a329eb25"
                        pastFares: element.pastFares, //(3) ['61c0db05230c93cb9fa77baa', '61c22c8004723d37f0ac78d1', '61c23bde56738a58f0fc95a0']
                        permit: element.permit, //"http://drive.google.com/uc?export=view&id=1TA7vfVTSOuRV4g8Fweq3XIwFHtB1kljS"
                        registration: element.registration, //"http://drive.google.com/uc?export=view&id=1LEcYEWFun3kwoY7ey2KrFzJeXsVuMEKS"
                        reviews: element.reviews, //[]
                        vehicleNumber: element.vehicleNumber, //"MH04DC7889"
                        vehicleType: element.vehicleType, //"Taxi"
                    },
                })
            })
            console.log("cleaned data", data);
            setdrivers(data);
        })
    }

    useEffect(()=> console.log('all users', allUsers), [allUsers]);

    useEffect(()=> {
        if ((drivers.length != 0) || (passenger.length != 0)) {
            setallUsers(passenger.concat(drivers));
        }
    }, [drivers, passenger])

    useEffect(()=> getUserDetails(), []);

    const deleteUser = async (id) => {
        setdisplayMsg(<>
            <h3 className="mb-5">Are you sure want to delete this account?</h3>
            <div className="100 flex">
                <button className="btn btn-outline-danger mx-3" onClick={() => deleteFinally(id)}>Delete</button>
                <button className="btn btn-outline-secondary mx-3" onClick={()=> setModalShow(false)}>No</button>
            </div>
        </>);
        setModalShow(true);
    }

    const deleteFinally = async (id) => {
        await axiosInstance.delete('http://localhost:3001/api/admin/deleteUser', {user: id})
        .then(()=>{
            console.log('user deleted')
        })
        .catch((e)=> console.log(e))
    }

    const driverModal = (doc) => {
        setdisplayMsg(<>
            <div className="w-100 text-start" style={{height:'70vh'}}>
                <h3>Driver Details</h3>
                <div className="w-100" style={{height:'60vh', overflowY:'scroll'}}>
                    <div className="row my-3">
                        <div className="col-3">Name:</div>
                        <div className="col-9">{doc.name}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Id:</div>
                        <div className="col-9">{doc.id}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Email:</div>
                        <div className="col-9">{doc.email}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Phone:</div>
                        <div className="col-9">{doc.phone}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Type:</div>
                        <div className="col-9">{doc.type}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Approved:</div>
                        <div className="col-9">{doc.driverData.approved}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Is Busy:</div>
                        <div className="col-9">{doc.driverData.busy}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Car Photo {/*doc.driverData.carPhoto*/}</div>
                        <div className="col-9"></div>
                        </div>
                    <div className="row my-3">
                        <div className="col-3">Driver Photo:</div>
                        <div className="col-9">{doc.driverData.driverPhoto}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Licence:</div>
                        <div className="col-9">{doc.driverData.liscence}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Permit:</div>
                        <div className="col-9">{doc.driverData.permit}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Registration:</div>
                        <div className="col-9">{doc.driverData.registration}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Reviews:</div>
                        <div className="col-9">{doc.driverData.reviews}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Vehicle Number:</div>
                        <div className="col-9">{doc.driverData.vehicleNumber}</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-3">Vehicle Type:</div>
                        <div className="col-9">{doc.driverData.vehicleType}</div>
                    </div>
                </div>
            </div>
        </>)
        setModalShow(true)
    }

    const cards = (item, i) => <div key={i} className="col-md-3 col-6">
        <div className="card shadow border-0">
            <div class="card-body">
                <h5 class="card-title fw-bold text-uppercase">{item.name}</h5>
                <p className="text-muted text-truncate" data-bs-toggle="tooltip" data-bs-placement="top" title={item.id}>id: {item.id}</p>
                <h6 class="yellow-btn active badge rounded-pill mb-2">{item.type}</h6>
                <p class="card-text">{item.email}</p>
                <p class="card-text">{item.phone}</p>
                <div className="w-100 flex">
                    <button className="btn purple-btn" onClick={() => deleteUser(item.id)}>Delete</button>
                    {item.type === 'driver' && <button onClick={()=> driverModal(item)}>View</button>}
                </div>
            </div>
        </div>
    </div>

    return (
        <div className="w-100 py-3">
            <ul class="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="btn purple-btn mx-2 active" id="pills-all-users-tab" data-bs-toggle="pill" data-bs-target="#pills-all-users" type="button" role="tab" aria-controls="pills-all-users" aria-selected="true">All Users</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="btn purple-btn mx-2" id="pills-passengers-tab" data-bs-toggle="pill" data-bs-target="#pills-passengers" type="button" role="tab" aria-controls="pills-passengers" aria-selected="false">Passengers</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="btn purple-btn mx-2" id="pills-drivers-tab" data-bs-toggle="pill" data-bs-target="#pills-drivers" type="button" role="tab" aria-controls="pills-drivers" aria-selected="false">Drivers</button>
                </li>
            </ul>
            <div className="bg-white mx-2 mx-md-5 rounded p-2 p-md-4">
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-all-users" role="tabpanel" aria-labelledby="pills-all-users-tab">
                        <div className="row gy-5">{allUsers[0] ? allUsers.map((data, i)=> cards(data, i)) : '404'}</div>
                    </div>
                    <div class="tab-pane fade" id="pills-passengers" role="tabpanel" aria-labelledby="pills-passengers-tab">
                        <div className="row gy-5">{passenger[0] ? passenger.map((data, i)=> cards(data, i)) : '404'}</div>
                    </div>
                    <div class="tab-pane fade" id="pills-drivers" role="tabpanel" aria-labelledby="pills-drivers-tab">
                        <div className="row gy-5">{drivers[0] ? drivers.map((data, i)=> cards(data, i)) : '404'}</div>
                    </div>
                </div>
            </div>

            <MyModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				msg={displayMsg}
			/>
        </div>
    )
}