import {expect, test} from '@oclif/test'

describe('webhook-tailf', () => {
  test
  .stdout()
  .command(['webhook-tailf'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['webhook-tailf', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
