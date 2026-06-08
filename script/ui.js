// UI layer: responsible for rendering and DOM updates only
function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    document
        .getElementById(sectionId)
        .classList.add("active");

    // Show selected section and hide all others
    document.querySelectorAll("nav button")
        .forEach(btn => btn.classList.remove("active-nav"));

    const activeButton = document.querySelector(
        `nav button[onclick="showSection('${sectionId}')"]`
    );

    if (activeButton) {
        activeButton.classList.add("active-nav");
    }
}

function renderFlights() { // Render all flights in main dashboard

    const flightList =
        document.getElementById("flightList");

    flightList.innerHTML = "";

    data.flights.forEach(flight => {

        flightList.innerHTML += `

            <table class="flightTable">

                <thead>

                    <tr>
                         <th colspan="3">
                            ID: ${flight.id} | ${flight.origin || "-"} → ${flight.destination}
                        </th>
                    </tr>

                    <tr>
                        <th>Capacity</th>
                        <th>Passengers</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    <tr>
                        <td>${flight.capacity}</td>
                        <td>${flight.passengers.length}</td>
                        <td>${flight.status}</td>
                    </tr>

                </tbody>

            </table>

            <br>

        `;
    });
}

function renderUsersFlights() { // Render pending flights with seat map for passenger assignment

    const usersFlightList =
        document.getElementById("usersFlightList");

    usersFlightList.innerHTML = "";

    data.flights
        .filter(flight => flight.status === "pending")
        .forEach(flight => {

            let rows = "";

            for (let i = 0; i < flight.capacity; i++) { // Build seat rows based on flight capacity

                const passenger = flight.passengers[i];

                rows += `
                    <tr>
                        <td>Seat ${i + 1}</td>
                        <td>${passenger?.id || "-"}</td>
                        <td>${passenger?.name || "Empty"}</td>
                        <td>
                            ${passenger ? `
                                <button onclick="removePassenger(${flight.id}, ${passenger.id})"> 
                                    Remove
                                </button>
                            ` : "-"}
                        </td>
                    </tr>
                `;
            }

            usersFlightList.innerHTML += `

                <table class="flightTable">

                    <thead>

                        <tr>
                            <th colspan="4">
                                ID: ${flight.id} | ${flight.origin || "-"} → ${flight.destination}
                            </th>
                        </tr>

                        <tr>
                            <th>Seat</th>
                            <th>ID</th>
                            <th>Passenger</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>

                </table>

                ${flight.passengers.length > 0 ? `
                    <button onclick="startFlight(${flight.id})">
                        Start Flight
                    </button>
                ` : ""}

                <br><br>

            `;
        });
}

function renderFlightSelect() {

    const flightSelect =
        document.getElementById("flightSelect");

    flightSelect.innerHTML =
        `<option value="">Select Flight</option>`;

    data.flights.forEach(flight => { // Populate dropdown with available flights for passenger assignment

        flightSelect.innerHTML += `
            <option value="${flight.id}">
                ${flight.id} | ${flight.origin || "-"} → ${flight.destination}
            </option>
        `;
    });
}

function renderInProgressFlights() { // Render flights that are currently in progress

    const activeFlights =
        document.getElementById("activeFlights");

    activeFlights.innerHTML = "";

    const flights =
        data.flights.filter(f => f.status === "inProgress");

    flights.forEach(flight => {

        activeFlights.innerHTML += `

            <table class="flightTable">

                <thead>
                    <tr>
                        <th colspan="3">
                            ID: ${flight.id} | ${flight.origin || "-"} → ${flight.destination}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Passengers: ${flight.passengers.length}</td>
                        <td>Miles: ${flight.miles}</td>
                        <td>Status: ${flight.status}</td>
                    </tr>
                </tbody>

            </table>

            <button onclick="finishFlight(${flight.id})">
                Finish Flight
            </button>

            <br><br>
        `;
    });
}

function renderHistory() { // Render completed flights history

    const historyList =
        document.getElementById("historyList");

    historyList.innerHTML = "";

    const completedFlights =
        data.flights.filter(f => f.status === "completed");

    completedFlights.forEach(flight => {

        historyList.innerHTML += `
            <table class="flightTable">

                <thead>
                    <tr>
                        <th colspan="3">
                            ${flight.origin || "-"} → ${flight.destination}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>ID: ${flight.id}</td>
                        <td>Miles: ${flight.miles}</td>
                        <td>Passengers: ${flight.passengers.length}</td>
                    </tr>
                </tbody>

            </table>

            <br>
        `;
    });
}

function renderPassengers() { // Aggregate passengers across all flights using Map to avoid duplicates

    const passengerList =
        document.getElementById("passengerList");

    passengerList.innerHTML = "";

    const passengersMap = new Map();

    data.flights.forEach(flight => {

        flight.passengers.forEach(p => {

            if (!passengersMap.has(p.id)) {
                passengersMap.set(p.id, {
                    id: p.id,
                    name: p.name,
                    miles: p.miles || 0
                });
            } else {
                const existing = passengersMap.get(p.id);
                existing.miles = p.miles || existing.miles;
            }
        });
    });

    passengersMap.forEach(p => {

        const freeMiles = p.miles * 0.10; // Calculate free miles (10% bonus logic)

        passengerList.innerHTML += `
            <table class="flightTable">

                <tbody>
                    <tr>
                        <td>ID: ${p.id}</td>
                        <td>Name: ${p.name}</td>
                        <td>Miles: ${p.miles}</td>
                        <td>Free Miles: ${freeMiles.toFixed(1)}</td>
                    </tr>
                </tbody>

            </table>

            <br>
        `;
    });
}