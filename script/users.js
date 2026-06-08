// Passenger management: add/remove users from flights
function addPassenger() { // Add passenger to selected flight with validation

    const passengerName =
        document.getElementById("userNameInput").value;

    const flightId =
        Number(document.getElementById("flightSelect").value);

    const flight =
        data.flights.find(
            flight => flight.id === flightId // Validate flight selection
        );

    if (!flight) {
        alert("Select a flight");
        return;
    }

    if (!passengerName) {
        alert("Enter passenger name");
        return;
    }

    if (flight.passengers.length >= flight.capacity) { // Prevent adding passengers if flight is full
        alert("Flight Full");
        return;
    }

    flight.passengers.push({
        id: nextPassengerId++,
        name: passengerName
    });

    renderUsersFlights();
    renderFlights();
    renderPassengers();

    document.getElementById("userNameInput").value = "";
}

function removePassenger(flightId, passengerId) { // Remove passenger from a specific flight seat

    const flight =
        data.flights.find(f => f.id === flightId);

    if (!flight) return;

    const index =
        flight.passengers.findIndex( // Find passenger index inside flight
            p => p.id === passengerId
        );

    if (index === -1) return;

    flight.passengers.splice(index, 1);

    renderUsersFlights();
    renderFlights();
}