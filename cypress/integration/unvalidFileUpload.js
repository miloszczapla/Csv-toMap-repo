const categories = ['address', 'zip', 'city', 'state', 'category'];
const file1 = 'fakedata.csv';
const file2 = 'realdata.csv';
const fileAttachmentOptions = { subjectType: 'drag-n-drop' };
const time = 3000;

const errors = [
  'headers have duplicates',
  'file schould contain no more than 20 rows',
  `every row schould have 5 columns maximum`,
];

const rowInFile = ['53-609', 'Fabryczna 31', 'Wroclaw', 'Dolnyslask', 'school'];

describe('check home page csv unvalid file handling', () => {
  it('upload file and move toward map trigger', () => {
    expect(true).to.equal(true);
    cy.visit('http://localhost:3000/');
    cy.contains('Upload CSV file').attachFile(file1, fileAttachmentOptions);

    for (let index = 0; index < rowInFile.length; index++) {
      const textContent = rowInFile[index];

      cy.get('div.items-center').contains(textContent);
    }
  });
  it('change headers', () => {
    for (let index = 0; index < categories.length; index++) {
      const header = categories[index];
      cy.get('div.category-header')
        .contains(`Column ${index + 1}`)
        .click();
      cy.contains(header).click();
    }
  });
  it('check that there are errors', () => {
    cy.wait(time);
    cy.get('.gm-style').should('not.exist');
    cy.contains(errors[1]);
    cy.contains(errors[2]);
  });
  it('trigger "headers have duplicates" error', () => {});
});
