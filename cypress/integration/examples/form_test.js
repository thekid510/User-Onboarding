describe("Form App", ()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3003/")
    })
    const nameInput = () => cy.get('input[name="name"]');
    const emailInput = () => cy.get('input[name="email"]')
    const passwordInput = () => cy.get('input[name="password"]')
    const termsInput = () => cy.get('input[name="tos"]')
    const submitButton = () => cy.get('#submitButton')
    it("sanity test to make sure that tests work", () => {
    
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
      });
    it("running input tests", ()=>{
        nameInput().should("have.value", "");
        emailInput().should("have.value", "");
        passwordInput().should("have.value", "");
        termsInput().should("not.be.checked");

        nameInput().type("James Freund");
        nameInput().should("have.value", "James Freund");
        emailInput().type("jamesf@gmail.com");
        passwordInput().type("codingisfun");
        submitButton().should("be disabled");
    });
});