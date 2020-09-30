import React, { useEffect , useState , useContext } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings , setBookings] = useState([])
    const [loggedInUser , setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email,{
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data));
    } , [])

    return (
        <div>
            <h2>You have {bookings.length} bookings</h2>
            {
                bookings.map(book => <li key = {book._id}>{book.name} from : {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} to : {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;