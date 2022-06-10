const fs = require('fs');
const { JSDOM } = require('jsdom');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const page = new JSDOM(html);

describe('index.html', () => {
    describe('head', () => {
        test('it has a title', () => {
            const title = page.window.document.querySelector('head title');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe("TITLE - Home")
        })
    })

    describe('body', () => {
        describe('button', () => {
            let button;

            beforeEach(() => {
                button = page.window.document.querySelector('#btn-post')
            })

            test('it exists', () => {
                expect(button).toBeTruthy();
            })

            test('it has a call to action', () => {
                expect(button.textContent.toLowerCase()).toContain('submit')
            })

        })

        describe('form', () => {
            let form;
            let postInput;
            beforeEach(() => {
                form = page.window.document.querySelector('#frm-compose-post')
                postInput = form.querySelector('#message');
            })
    
            test('it exists', () => {
                expect(form).toBeTruthy();
            });
    
            describe('post input', () => {
                test('it has an id of "message"', () => {
                    expect(postInput).toBeTruthy();
                })

                test('it is a text input"', () => {
                    expect(postInput.tagName).toBe('TEXTAREA')
                })
        
                test('it has a label"', () => {
                    expect(page.window.document.querySelector('[for="message"]')).toBeTruthy();
                })
            })

        })

        test('it has a div to display posts', () => {
            expect(page.window.document.querySelector('#post-list')).toBeTruthy();
        })
    })


})