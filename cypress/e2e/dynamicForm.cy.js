describe('DynamicForm - validation and conditions', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    // 1️⃣ Required fields validation
    describe('Required fields', () => {

        it('should show required errors on empty submit', () => {
            cy.contains('Pateikti').click();
            cy.contains('Šis laukas yra privalomas').should('exist');
        });

        it('should validate firstName for numbers', () => {
            cy.get('input#firstName').type('Karolis123');
            cy.contains('Pateikti').click();
            cy.contains('Galima įvesti tik raides').should('exist');

            cy.get('input#firstName').clear().type('Karolis');
            cy.contains('Pateikti').click();
            cy.contains('Galima įvesti tik raides').should('not.exist');
        });
    });

    // 2️⃣ Conditional visibility
    describe('Conditional visibility', () => {

        it('should show Email when Age >= 18', () => {
            cy.get('input#age').type('18');
            cy.get('input#email').should('exist');
        });

        it('should not show Email when Age < 18', () => {
            cy.get('input#age').type('17');
            cy.get('input#email').should('not.exist');
        });

        it('should show Student ID when Age < 26', () => {
            cy.get('input#age').clear().type('25');
            cy.get('input#studentId').should('exist');
        });

        it('should not show Student ID when Age >= 26', () => {
            cy.get('input#age').clear().type('26');
            cy.get('input#studentId').should('not.exist');
        });

        it('should show Maternity Leave when gender = Moteris', () => {
            cy.get('select#gender').select('Moteris');
            cy.get('select#onMaternityLeave').should('exist');
        });

        it('should not show Maternity Leave when gender != Moteris', () => {
            cy.get('select#gender').select('Vyras');
            cy.get('select#onMaternityLeave').should('not.exist');

            cy.get('select#gender').select('Kita');
            cy.get('select#onMaternityLeave').should('not.exist');
        });
    });

    // 3️⃣ Discount code logic
    describe('Discount Code visibility logic', () => {

        it('should show Discount Code when Age < 26 and Student ID entered', () => {
            cy.get('input#age').clear().type('25');
            cy.get('input#studentId').type('STU-123');
            cy.get('input#discountCode').should('exist');
        });

        it('should not show Discount Code if Student ID is empty', () => {
            cy.get('input#age').clear().type('25');
            cy.get('input#studentId').clear();
            cy.get('input#discountCode').should('not.exist');
        });

        it('should not show Discount Code if Age >= 26', () => {
            cy.get('input#age').clear().type('26');

            cy.get('input#studentId').should('not.exist');

            cy.get('input#discountCode').should('not.exist');
        });
    });

    // 4️⃣ Full happy path test
    it('should submit valid form with correct visible fields', () => {
        // Stub window.alert and parse the JSON
        cy.window().then((win) => {
            cy.stub(win, 'alert').callsFake((msg) => {
                const data = JSON.parse(msg);
                expect(data.firstName).to.eq('Karolis');
                expect(data.age).to.eq('25');
                expect(data.gender).to.eq('Moteris');
                expect(data.email).to.eq('karolis@example.com');
                expect(data.onMaternityLeave).to.eq('Ne');
                expect(data.studentId).to.eq('STU-123');
                expect(data.discountCode).to.eq('DISCOUNT');
            }).as('alert');
        });

        cy.get('input#firstName').type('Karolis');
        cy.get('input#age').type('25');
        cy.get('select#gender').select('Moteris');
        cy.get('input#email').type('karolis@example.com');
        cy.get('select#onMaternityLeave').select('Ne');
        cy.get('input#studentId').type('STU-123');
        cy.get('input#discountCode').type('DISCOUNT');

        cy.contains('Pateikti').click();

        cy.get('@alert').should('have.been.calledOnce');
    });

});
