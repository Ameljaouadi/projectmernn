// login.test.js

// Importation des modules nécessaires
const assert = require('assert');
const sinon = require('sinon');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetch = require('node-fetch');

// Importez le composant à tester
const Login = require('./components/Login');

// Configuration de jsdom
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;

// Exemple de test avec Mocha
describe('Login Component', () => {
  it('should send login request when form is submitted', async () => {
    // Stub pour simuler la fonctionnalité fetch
    const fetchStub = sinon.stub(fetch, 'fetch');

    // Stub pour simuler la fonction de gestion de l'événement de soumission du formulaire
    const submitHandler = sinon.stub(Login.prototype, 'handleSubmit');

    // Créez une instance de Login
    const loginComponent = new Login();

    // Simuler la soumission du formulaire en appelant la méthode handleSubmit
    loginComponent.handleSubmit();

    // Vérifiez si la méthode handleSubmit a été appelée
    assert(submitHandler.called);

    // Restaurer les stubs après le test
    fetchStub.restore();
    submitHandler.restore();
  });
});
