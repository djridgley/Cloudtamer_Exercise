/// <reference types="cypress" />

class Page {
    // Main
    get hotelsNavItem() { return '.main-menu-content nav a:contains(Hotels)'; }
    get flightsNavItem() { return '.main-menu-content nav a:contains(flights)'; }

    // Hotels Page
    get searchEnabler() { return 'b[role="presentation"]'; }
    get searchBar() { return '[type="search"]'; }
    get searchTopic() { return 'li[role="option"]'; }
    get checkIn() { return '[name="checkin"]'; }
    get activeStartDay() { return 'td.active:nth(0)'; }
    get travelersDropdown() { return 'a.travellers'; }
    get adultsInput() { return '#adults'; }
    get childrenInput() { return '#childs'; }
    get submitSearch() { return '#submit:contains(Search)'; }
    get firstHotel() { return 'span:contains(Details):nth(0)'; }
    get tripleRoom() { return 'button:contains(Book Now):nth(1)'; }
    get stripePaymentMethod() { return '#gateway_stripe'; }
    get confirmBooking() { return 'button#booking:contains(Confirm Booking)'; }

    // Flights Page
    get oneWayRadio() { return '#one-way'; }
    get roundTripRadio() { return '#round-trip'; }
    get mainMenuBox() { return '#onereturn'; }
    get passengerBox() { return '.dropdown-menu-wrap'; }
    get flightTypeSelect() { return '#flight_type'; }




    // Reusable Methods
    clickElement(el) {
        cy.get(el)
            .should('be.visible')
            .click({ force: true });
    }

    fillInput(el, text) {
        cy.get(el)
            .type(text);
    }

    selectOption(el, option) {
        cy.get(el)
            .select(option, { force: true })
    }
}

module.exports = new Page();