describe('Web Application Functionalities', () => {

    describe('Login Functionality', () => {

        beforeEach(() => {
            // Visit the login page before each test
            cy.visit('/login'); // Replace with your application's login page URL
        });

        it('should login successfully with valid credentials', () => {
            const username = 'testUser';
            const password = 'testPassword';

            cy.get('input[name="username"]').type(username); // Replace with your username input selector
            cy.get('input[name="password"]').type(password); // Replace with your password input selector
            cy.get('button[type="submit"]').should('be.visible').click(); // Replace with your submit button selector

            cy.url().should('include', '/dashboard'); // Replace with the URL you expect after a successful login
            cy.contains('Welcome, testUser').should('be.visible'); // Replace with a message or element that confirms successful login
        });

        it('should display an error message for an invalid username', () => {
            const username = 'wrongUser';
            const password = 'testPassword';

            cy.get('input[name="username"]').type(username);
            cy.get('input[name="password"]').type(password);
            cy.get('button[type="submit"]').should('be.visible').click();

            cy.get('.error-message') // Replace with your error message selector
                .should('be.visible')
                .and('contain', 'Invalid credentials'); // Replace with the exact error message text
        });

        it('should display an error message for an invalid password', () => {
            const username = 'testUser';
            const password = 'wrongPassword';

            cy.get('input[name="username"]').type(username);
            cy.get('input[name="password"]').type(password);
            cy.get('button[type="submit"]').should('be.visible').click();

            cy.get('.error-message')
                .should('be.visible')
                .and('contain', 'Invalid credentials');
        });

        it('should disable login button if fields are empty', () => {
            cy.get('button[type="submit"]').should('be.disabled'); // Replace with your submit button selector
        });
    });

    describe('User Registration Functionality', () => {

        beforeEach(() => {
            // Visit the registration page before each test
            cy.visit('/register'); // Replace with your application's registration page URL
        });

        it('should register a new user with valid details', () => {
            const username = 'newUser';
            const password = 'newPassword';
            const email = 'newuser@example.com';

            cy.get('input[name="username"]').type(username);
            cy.get('input[name="password"]').type(password);
            cy.get('input[name="email"]').type(email);

            cy.get('button[type="submit"]').should('be.visible').click();

            cy.url().should('include', '/login'); // Replace with the URL you expect after a successful registration
            cy.contains('Registration successful').should('be.visible'); // Replace with a message or element that confirms successful registration
        });

        it('should display an error for existing username', () => {
            const username = 'existingUser';
            const password = 'newPassword';
            const email = 'existinguser@example.com';

            cy.get('input[name="username"]').type(username);
            cy.get('input[name="password"]').type(password);
            cy.get('input[name="email"]').type(email);

            cy.get('button[type="submit"]').should('be.visible').click();

            cy.get('.error-message')
                .should('be.visible')
                .and('contain', 'Username already exists');
        });

        it('should display an error for invalid email format', () => {
            const username = 'newUser';
            const password = 'newPassword';
            const email = 'invalid-email';

            cy.get('input[name="username"]').type(username);
            cy.get('input[name="password"]').type(password);
            cy.get('input[name="email"]').type(email);

            cy.get('button[type="submit"]').should('be.visible').click();

            cy.get('.error-message')
                .should('be.visible')
                .and('contain', 'Invalid email format');
        });
    });

    describe('Dashboard Functionality', () => {

        beforeEach(() => {
            // Simulate a logged-in state by navigating to the dashboard
            cy.visit('/dashboard'); // Replace with your application's dashboard URL
        });

        it('should display user-specific content on the dashboard', () => {
            cy.contains('Welcome, testUser').should('be.visible'); // Replace with a welcome message or specific user content
        });

        it('should log out successfully and redirect to login page', () => {
            cy.get('button#logout').should('be.visible').click(); // Replace with your logout button selector

            cy.url().should('include', '/login'); // Replace with the URL you expect after logging out
        });

        it('should not allow access to dashboard when not logged in', () => {
            cy.visit('/dashboard'); // Replace with your application's dashboard URL

            cy.url().should('include', '/login'); // Replace with the URL you expect for redirection when not logged in
            cy.contains('Please log in').should('be.visible'); // Replace with the appropriate message
        });
    });
});
