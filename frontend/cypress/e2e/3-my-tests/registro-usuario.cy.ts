describe('Register User', () => {

    // Caso de prueba
    // Simula un registro de usuario exitoso
    it('Debe permitir el registro de usuario con datos validos', () => {
        cy.visit('http://localhost:4200/login');
        cy.wait(2000)

        // Diligencia los campos del formulario con credenciales válidas
        cy.get('input[formControlName="email"]').type('spedraza1003@gmail.com');
        cy.get('input[formControlName="password"]').type('P@sswordAppWeb1988');
        cy.wait(2000);

        // Se debe dar click en el boton
        cy.get('button[type="submit"]').click();
        cy.wait(3000);

        // Validar que se redirige al home del panel
        cy.url().should('include', '/home-admin');

        // 4. Click en opción "Usuarios" del menú
        cy.contains('Usuarios').click();
        cy.wait(2000);

        // 5. Click en botón "Crear Usuario"
        cy.contains('Crear Usuario').click();
        cy.wait(2000);

        // Diligenciar formulario de creación de usuario
        cy.get('input[formControlName="email"]').type('agomez@correo.com');
        cy.get('input[formControlName="nombre"]').type('Alejandra Gomez');
        cy.get('input[formControlName="password"]').type('Password123*');
        cy.get('select[formControlName="role"]').select('admin');

        // Click en botón Registrar
        cy.contains('button', 'Registrar').click();
        cy.wait(3000);

        // Validar mensaje de éxito
        cy.contains('El usuario se ha creado correctamente').should('be.visible');

     


    });


})