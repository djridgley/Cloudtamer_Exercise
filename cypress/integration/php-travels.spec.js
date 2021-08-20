
import mainPage from '../pageObjects/main.page';

describe('Cloudtamer Exercise', function () {
    let toggleDatePicker;

    before(function () {
        toggleDatePicker = type => mainPage.clickElement(type);
    });

    beforeEach(function () {
        cy.visit('');
    });

    it('Should check into Tria Hotel', function () {
        // 1 week from current date
        // 2 adults & 2 children
        // There appears to be no Alzer Hotel in Istanbul anymore, so using the Tria in Istanbul instead
        let nextWeek = new Date(new Date().setDate(new Date().getDate() + 7))
        let startDay = nextWeek.getDate();

        // Navigate to hotels page
        mainPage.clickElement(mainPage.hotelsNavItem);

        // Search box is a select by default, turns into input when clicked
        mainPage.clickElement(mainPage.searchEnabler);
        mainPage.fillInput(mainPage.searchBar, 'Istanbul');
        mainPage.clickElement(`${mainPage.searchTopic}:contains(Istanbul,Turkey)`);

        // Select start date one week from current date
        toggleDatePicker(mainPage.checkIn);
        cy.get(mainPage.activeStartDay).siblings('td').contains(startDay).click();

        // alternative is to click + or - but wanted to demonstrate multiple ways to do things
        mainPage.clickElement(mainPage.travelersDropdown);
        cy.get(mainPage.adultsInput).invoke('attr', 'value', '2');
        cy.get(mainPage.childrenInput).invoke('attr', 'value', '2');
        mainPage.clickElement(mainPage.travelersDropdown);

        // Submit search
        mainPage.clickElement(mainPage.submitSearch);

        // Select tria
        mainPage.clickElement(mainPage.firstHotel);

        // Choose triple Room
        mainPage.clickElement(mainPage.tripleRoom);

        // Pick a payment method (required)
        mainPage.clickElement(mainPage.stripePaymentMethod);

        // Submit reservation
        mainPage.clickElement(mainPage.confirmBooking);
    });

    it('Flights Tab 1', function () {
        mainPage.clickElement(mainPage.flightsNavItem);

        // Confirm radio button default status
        cy.get(mainPage.oneWayRadio).should('be.checked');

        // Confirm Labels
        cy.get(`${mainPage.mainMenuBox} label:nth(0)`).should('have.text', 'Flying From');
        cy.get(`${mainPage.mainMenuBox} label:nth(1)`).should('have.text', 'To Destination');
        cy.get(`${mainPage.mainMenuBox} label:nth(2)`).should('have.text', 'Departure Date');
        cy.get(`${mainPage.mainMenuBox} label:nth(4)`).should('have.text', 'Passengers');
        cy.get(`${mainPage.passengerBox} label:nth(0)`).should('contain.text', 'Adults');
        cy.get(`${mainPage.passengerBox} label:nth(1)`).should('contain.text', 'Childs');
        cy.get(`${mainPage.passengerBox} label:nth(2)`).should('contain.text', 'Infants');

        // Select  First
        mainPage.selectOption(mainPage.flightTypeSelect, 'First');
    });

    it('Flights Tab 2', function () {
        mainPage.clickElement(mainPage.flightsNavItem);

        // Click round trip
        mainPage.clickElement(mainPage.roundTripRadio);

        // Confirm return date
        cy.get(`${mainPage.mainMenuBox} label:nth(3)`).should('have.text', 'Return Date').and('be.visible');

        // Swap to one way
        mainPage.clickElement(mainPage.oneWayRadio);

        // Confirm return date disappears
        cy.get(`${mainPage.mainMenuBox} label:nth(3)`).should('have.text', 'Return Date').and('be.hidden');
    });

    it('Nav Loop', function () {
        // I'm unsure if there used to be tabs for Boats, Rentals & Cars but that doesn't seem to be the case now, so I used the nav items available
        const taskItems = [
            { tab: 'Hotels', search: "#submit" },
            { tab: 'flights', search: "#flights-search" },
            { tab: 'Tours', search: "#submit" },
            { tab: 'visa', search: "#submit" }
        ];

        taskItems.forEach(i => {
            cy.get(`a:contains(${i.tab})`).click();
            cy.get(i.search).should('be.visible');
        });
    });
});