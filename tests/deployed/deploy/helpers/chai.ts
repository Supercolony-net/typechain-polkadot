import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

declare global {
  export namespace Chai {
    interface Assertion {
      output(value: any, msg?: string): void
      outputProps(value: any, msg?: string): void
    }
  }
}

chai.use(chaiAsPromised)
chai.use((chai) => {
  chai.Assertion.addMethod('output', async function (param, message) {
    await new chai.Assertion(this._obj).to.eventually.have.property('output').to.equal(param, message)
  })
  chai.Assertion.addMethod('outputProps', async function (props, message) {
    const result = await this._obj
    await new chai.Assertion(result).to.have.property('output')

    for (const key in props) {
      new chai.Assertion(result.output).to.have.property(key).to.equal(props[key], message)
    }
  })
})

export const { expect } = chai
