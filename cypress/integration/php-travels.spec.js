
import mainPage from '../pageObjects/main.page';

describe('Cloudtamer Exercise', function () {
    let toggleDatePicker, nextWeek, startDay;

    before(function () {
        toggleDatePicker = type => mainPage.clickElement(type);
        nextWeek = new Date(new Date().setDate(new Date().getDate() + 7));
        startDay = nextWeek.getDate();
    });

    beforeEach(function () {
        cy.visit('');
    });

    it('Should check into Tria Hotel', function () {
        // 1 week from current date
        // 2 adults & 2 children
        // There appears to be no Alzer Hotel in Istanbul anymore, so using the Tria in Istanbul instead

        // Navigate to hotels page
        mainPage.clickElement(mainPage.hotelsNavItem);

        // Search box is a select by default, turns into input when clicked
        mainPage.clickElement(mainPage.searchEnabler);
        mainPage.fillInput(mainPage.searchBar, 'Istanbul');
        mainPage.clickElement(`${mainPage.searchTopic}:contains(Istanbul,Turkey)`);

        // Select start date one week from current date
        // I would suggest to developer to allow this field to allow text input manually for automation purposes
        // Invoking value attribute overwrites here does not work, you must click a date in the picker
        toggleDatePicker(mainPage.checkIn);
        cy.get(mainPage.activeStartDay).siblings('td').contains(startDay).click();

        // Criteria didn't say to specify end date otherwise that would be here

        // Add two children to the reservation
        mainPage.clickElement(mainPage.travelersDropdown);
        mainPage.clickElement(mainPage.childsPlus);
        mainPage.clickElement(mainPage.childsPlus);
        mainPage.clickElement(mainPage.travelersDropdown);
        // Alernatively can do this
        // cy.get(mainPage.childrenInput).invoke('attr', 'value', '2');

        // Submit search
        mainPage.clickElement(mainPage.submitSearch);

        // Select Tria hotel
        mainPage.clickElement(mainPage.firstHotel);

        // Choose triple Room
        mainPage.clickElement(mainPage.tripleRoom);

        // Pick a payment method (required)
        mainPage.clickElement(mainPage.stripePaymentMethod);

        // Submit reservation
        mainPage.clickElement(mainPage.confirmBooking);

        // Short pause to view confirmation for Cloudtamer reviewer
        cy.wait(3000);
    });

    it('Flights Tab 1', function () {
        // Navigate to flights page
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

        // Select First from drowdown
        mainPage.selectOption(mainPage.flightTypeSelect, 'First');

        // Short pause to see dropdown selection for reviewer
        cy.wait(1500);
    });

    it('Flights Tab 2', function () {
        // Navigate to flights page
        mainPage.clickElement(mainPage.flightsNavItem);

        // Click round trip
        mainPage.clickElement(mainPage.roundTripRadio);

        // Confirm return date is visible
        cy.get(`${mainPage.mainMenuBox} label:nth(3)`).should('have.text', 'Return Date').and('be.visible');

        // Swap to one way
        mainPage.clickElement(mainPage.oneWayRadio);

        // Confirm return date is hidden
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





    it.skip('First test in very slow mode for viewing', function () {
        mainPage.clickElement(mainPage.hotelsNavItem);
        cy.wait(300);
        mainPage.clickElement(mainPage.searchEnabler);
        cy.scrollTo('top');
        cy.wait(800);

        mainPage.fillInput(mainPage.searchBar, 'Istanbul');
        cy.scrollTo('top');
        cy.wait(800);
        mainPage.clickElement(`${mainPage.searchTopic}:contains(Istanbul,Turkey)`);
        cy.scrollTo('top');
        cy.wait(800);

        toggleDatePicker(mainPage.checkIn);
        cy.scrollTo('top');
        cy.wait(1500);
        cy.get(mainPage.activeStartDay).siblings('td').contains(startDay).click();
        cy.scrollTo('top');
        cy.wait(1500);

        // Add children
        mainPage.clickElement(mainPage.travelersDropdown);
        cy.scrollTo('top');
        cy.wait(800);
        mainPage.clickElement(mainPage.childsPlus);
        cy.scrollTo('top');
        cy.wait(800);
        mainPage.clickElement(mainPage.childsPlus);
        cy.scrollTo('top');
        cy.wait(800);
        mainPage.clickElement(mainPage.travelersDropdown);

        // Submit search
        mainPage.clickElement(mainPage.submitSearch);
        cy.scrollTo('top');
        cy.wait(500);

        // Select tria
        mainPage.clickElement(mainPage.firstHotel);
        cy.scrollTo('top');
        cy.wait(500);

        // Choose triple Room
        cy.get(mainPage.tripleRoom).scrollIntoView();
        cy.wait(1500);
        mainPage.clickElement(mainPage.tripleRoom);

        // Pick a payment method (required)
        cy.get(mainPage.stripePaymentMethod).scrollIntoView();
        cy.wait(1500);
        mainPage.clickElement(mainPage.stripePaymentMethod);

        // Submit reservation
        cy.scrollTo('bottom');
        cy.wait(1000);
        mainPage.clickElement(mainPage.confirmBooking);
        cy.wait(5000);
    });
});