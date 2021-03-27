import {expect, test} from '@oclif/test'

describe('play-webhook-events', () => {
  test
  .stdout()
  .command(['play-webhook-events'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['play-webhook-events', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
