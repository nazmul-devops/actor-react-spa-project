/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import './Home.css'
const Home = () => {
    const [allActors, setAllActors] = useState([]);
    const [selectedActors, setSelectedActors] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [remainingBalance, setRemainingBalance] = useState(0);

    useEffect (() => {
        fetch("./data.json")
        .then(res => res.json())
        .then(data => setAllActors(data))
    }, [])

    const handleSelectActor = (actor) => {
        let count = actor.salary;
        const isExist = selectedActors.find((item) => item.id == actor.id)
        if (isExist){
            Swal.fire({
                title: 'Already Booked',
                // text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Close'
              })
        } else {
            selectedActors.forEach((item) => {
                count += item.salary;
            });
            const remainingBalance = 20000 - count;
            if (count > 20000) {
                // return alert('Balance insufficient');
                Swal.fire({
                    title: 'Insufficient Balance',
                    // text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Close'
                  })
            } else {
                setTotalCost(count);
                setRemainingBalance(remainingBalance);
                const newSelectedActors = [...selectedActors, actor];
                setSelectedActors(newSelectedActors);
                Swal.fire('Actor added successfully!!!')
            }
        }
    }
    // console.log(selectedActors);

    return (
        <div className='container'>
            <div className="home-container">
                <div className="card-container">
                    {
                        allActors.map(actor => (
                            <div key={actor.id} className="card">
                        <div className="card-img">
                            <img className='photo' src={actor.image} alt="" />
                        </div>
                        <h2>{actor.name}</h2>
                        <p>Age: {actor.age} Years</p>
                        <p>Country: {actor.country}</p>
                        <div className="info">
                            <p>{actor.role}</p>
                            <p>Salary: ${actor.salary}</p>
                        </div>
                        <button onClick={() => handleSelectActor(actor)} className='card-btn'>Select</button>
                    </div>
                        ))
                    }
                </div>

                <div className="cart">
                    <Cart selectedActors={selectedActors} totalCost={totalCost} remainingBalance={remainingBalance}  ></Cart>
                </div>
            </div>
            
        </div>
    );
};
 
export default Home;