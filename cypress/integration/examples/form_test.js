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
})