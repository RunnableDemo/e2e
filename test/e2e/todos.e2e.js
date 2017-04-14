const webdriver = require('selenium-webdriver')
const By = webdriver.By
const until = webdriver.until
const Key = webdriver.Key

const chai = require('chai');
const expect = chai.expect;

const driver = new webdriver.Builder()
  .usingServer('http://chrome:4444/wd/hub/')
  .forBrowser('chrome')
  .build()

describe('todo app', () => {
  before(function () {
    this.timeout(10000)
    return driver.navigate().to(process.env.WEB_URL || 'http://localhost')
  })

  it('renders the proper notification', () => {
    return driver.findElement(By.className('small'))
      .then(element => element.getText())
      .then(value => expect(value).to.equal('Each branch gets its own database. Check it out and then head back to Runnable.'))
  })

  it('can add a todo', () => {
    return driver.findElement(By.className('input')).sendKeys('Hello')
      .then(() => driver.findElement(By.className('input')).sendKeys(Key.ENTER))
      .then(() => driver.wait(until.elementLocated(By.css('li'))))
      .then(() => driver.findElement(By.css('li')))
      .then(element => element.getText())
      .then(value => expect(value).to.equal('Hello'))
  })

  it('can remove a todo', () => {
    return driver.findElement(By.className('button-complete'))
      .then(element => element.click())
      .then(() => driver.findElements(By.css('li')))
      .then(element => expect(element).to.be.empty)
  })

  after(() => {
    return driver.quit()
  })
})
