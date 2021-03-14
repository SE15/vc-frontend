describe("my first test", ()=>{
    it("shold do anything",()=>{
        cy.visit('http://localhost:3000')
        cy.get('input[type="email"]').type('danushka@gmail.com')
        cy.get('input[type="password"]').type('abc')
        cy.get('button[type="submit"]').click()
    });
});