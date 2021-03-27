import {expect, test} from '@oclif/test'

describe('WebhookTailf', () => {
  test
  .stdout()
  .command(['WebhookTailf'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['WebhookTailf', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
