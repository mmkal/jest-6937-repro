const {createPool, sql} = require('slonik')

describe('open handles test', () => {
  const slonik = createPool(`postgresql://postgres:postgres@localhost:5434/postgres`, {
    maximumPoolSize: 1,
    minimumPoolSize: 1,
    idleTimeout: 1,
  })
  beforeAll(async () => {
    await slonik.query(sql`drop table if exists foo`)
    await slonik.query(sql`create table foo(id serial primary key, bar text)`)
    await slonik.query(sql`insert into foo(bar) values('one two three')`)
  })

  if (process.env.AFTER_ALL_WORKAROUND) {
    afterAll(() => new Promise(r => setTimeout(r, 0))) 
  }

  it('selects', async () => {
    const result = await slonik.one(sql`select * from foo`)
    expect(result).toMatchInlineSnapshot(`
      Object {
        "bar": "one two three",
        "id": 1,
      }
    `)
  })
})