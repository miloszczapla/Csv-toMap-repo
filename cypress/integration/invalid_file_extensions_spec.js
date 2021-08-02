const file1 = 'fakedata.csv';
const file2 = 'realdata.csv';
const file3 = 'csv-to-map1.xls';
const file4 = 'użytkownik.txt';

const fileAttachmentOptions = { subjectType: 'drag-n-drop' };
const acceptedFileType = '.csv';
const error = `file schold be of type: "${acceptedFileType}"`;

describe('file upload drag and drop test', () => {
  it('upload valid and then invalid file extension', () => {
    cy.visit(Cypress.env('LOCAL_ADDRESS'));
    cy.contains('Upload CSV file').attachFile(file1, fileAttachmentOptions);
    cy.contains(error).should('not.exist');
    cy.contains('Upload CSV file').attachFile(file3, fileAttachmentOptions);
    cy.contains(error);

    cy.contains('Upload CSV file').attachFile(file2, fileAttachmentOptions);
    cy.contains(error).should('not.exist');
    cy.contains('Upload CSV file').attachFile(file4, fileAttachmentOptions);
    cy.contains(error);
  });
});
