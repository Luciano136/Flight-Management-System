function handleCreateFlight() { // Read inputs and create a new flight

    const origin =
        document.getElementById("originInput").value;

    const destination =
        document.getElementById("destinationInput").value;

    const miles =
        Number(document.getElementById("milesInput").value);

    const capacity =
        Number(document.getElementById("capacityInput").value);

    createFlight(origin, destination, miles, capacity);

}

function createFlight(origin, destination, miles, capacity) { // Create new flight object and push it into global state

    const flight = {
        id: nextFlightId++,
        origin,
        destination,
        miles,
        capacity: Number(capacity),
        status: "pending",
        passengers: []
    };

    data.flights.push(flight);

    renderFlights();
    renderUsersFlights();
    renderFlightSelect();
    renderInProgressFlights();
}

function startFlight(flightId) { // Validate flight before starting (must have passengers and be pending)

    const flight =
        data.flights.find(f => f.id === flightId);

    if (!flight) return; 

    if (flight.passengers.length === 0) {
        alert("Cannot start empty flight");
        return;
    }

    if (flight.status !== "pending") {
        alert("Flight already started or finished");
        return;
    }

    flight.status = "inProgress";

    renderFlights();
    renderUsersFlights();
    renderInProgressFlights();
}

function finishFlight(flightId) { // Complete flight and distribute miles to passengers

    const flight =
        data.flights.find(f => f.id === flightId);

    if (!flight) return;

    if (flight.status !== "inProgress") { // Only allow finishing flights that are in progress
        alert("Flight is not in progress");
        return;
    }

    flight.passengers.forEach(p => { // Add flight miles to each passenger
        p.miles = (p.miles || 0) + flight.miles;
    });

    flight.status = "completed";

    renderFlights();
    renderUsersFlights();
    renderInProgressFlights();
    renderHistory();
    renderPassengers();
}