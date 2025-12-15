describe('Login Panel', () => {

    // Caso de prueba
    // Simula un login exitoso con credenciales válidas 
    it('Debe permitir el inicio de sesión con credenciales validas', () => {
        cy.visit('http://localhost:4200/login');
        cy.wait(2000); 

        // Diligencia los campos del formulario con credenciales válidas
        cy.get('input[formControlName="email"]').type('spedraza1003@gmail.com');
        cy.get('input[formControlName="password"]').type('P@sswordAppWeb1988');
        cy.wait(2000);

        // Se debe dar click en el boton
        cy.get('button[type="submit"]').click();
        cy.wait(3000);

        // Validar que se redirige al home del panel
        cy.url().should('include', '/home-admin');
        cy.contains('Blackened Camisetas').should('be.visible'); // Mensaje de confirmación
    });


})