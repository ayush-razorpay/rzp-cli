import {expect, test} from '@oclif/test'

describe('replay_webhook_events', () => {
  test
  .stdout()
  .command(['replay_webhook_events'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['replay_webhook_events', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
