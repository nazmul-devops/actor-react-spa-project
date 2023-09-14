/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const Cart = ({selectedActors, totalCost, remainingBalance}) => {
    // console.log(selectedActors);
    return (
        <div>
            <h2>Total Actors: {selectedActors.length}</h2>
            <h3>Total Cost: {totalCost}</h3>
            <h3>Remaining Balance: {remainingBalance}</h3>
            {
                selectedActors.map(actor => <li key={actor.id}> {actor.name}</li>)
            }
        </div>
    );
};

export default Cart;