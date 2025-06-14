const newDeliveryFormEl = document.getElementsByTagName("form")[0];
const startTimeInputEl = document.getElementById("start-datetime");
const endTimeInputEl = document.getElementById("end-datetime");
const pastDeliveryContainer = document.getElementById("past-deliveries");

newDeliveryFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const startTime = startTimeInputEl.value;
    const endTime = endTimeInputEl.value;

    storeNewDelivery(startTime, endTime);

    renderPastDeliveries();

    newDeliveryFormEl.reset();
})

const STORAGE_KEY = "driver-analytics";

function storeNewDelivery(startTime, endTime) {
    const deliveries = getAllStoredDeliveries();

    deliveries.push({startTime, endTime });

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(deliveries))
}

function getAllStoredDeliveries() {
    const data = window.localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data): [];
}

function renderPastDeliveries() {
    const deliveries = getAllStoredDeliveries();

    if (deliveries.length == 0) return;

    pastDeliveryContainer.textContent = "";

    const pastDeliveryHeader = document.createElement("h2");
    pastDeliveryHeader.textContent = "Past Deliveries";

    const pastDeliveryList = document.createElement("ul");

    deliveries.forEach(delivery => {
        const deliveryEl = document.createElement("li");
        deliveryEl.textContent = `From ${delivery.startTime} to ${delivery.endTime}`;
        pastDeliveryList.appendChild(deliveryEl);
    })

    pastDeliveryContainer.appendChild(pastDeliveryHeader);
    pastDeliveryContainer.appendChild(pastDeliveryList);

};

renderPastDeliveries();