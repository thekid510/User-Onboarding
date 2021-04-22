describe("Form App", ()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3003/")
    })
    const nameInput = () => cy.get('input[name="username"]');
    const emailInput = () => cy.get('input[name="email"]')
    const passwordInput = () => cy.get('input[name="password"]')
    
    

    it("sanity test to make sure that tests work", () => {
    
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
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

       

        
        
        
       
        
    });
});