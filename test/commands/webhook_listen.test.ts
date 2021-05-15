import {expect, test} from '@oclif/test'

describe('webhook_listen', () => {
  test
  .stdout()
  .command(['webhook_listen'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['webhook_listen', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
