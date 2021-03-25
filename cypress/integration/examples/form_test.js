describe("Form App", ()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3003/")
    })
    const nameInput = () => cy.get('input[name="username"]');
    const emailInput = () => cy.get('input[name="email"]')
    const passwordInput = () => cy.get('input[name="password"]')
    const termsInput = () => cy.get('input[name="Terms"]')
    const submitButton = () => cy.get('#submitButton')

    it("sanity test to make sure that tests work", () => {
    
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
      });
      it("the proper elements are showing on the screen", () => {
        nameInput().should("exist");
        cy.get('input[name="foobar"]').should("not.exist");
        emailInput().should("exist");
        passwordInput().should("exist");
        submitButton().should("exist");
        cy.contains(/submit/i);
        expect({}).not.to.equal({}); // not strict (===)
        expect({}).to.eql({}); // strict
      });

    it("running input tests", ()=>{
        nameInput()
        .should("have.value", "")
        .type("James")
        .should("have.value","James");

        emailInput()
        .should("have.value", "")
        .type("jamesf@gmail.com")
        .should("have.value","jamesf@gmail.com");

        passwordInput()
        .should("have.value", "")
        .type("codingisfun")
        .should("have.value", "codingisfun");

        termsInput()
        .should("not.be.checked");

        
        
        
       
        submitButton().should("be disabled");
    });
});