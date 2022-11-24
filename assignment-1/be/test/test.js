const a = [
  {
    t: '1',
    c: [
      {
        t: '2',
        c: [
          {
            t: '3',
            c: [
              {
                t: '4',
                c: [
                  {
                    t: '5',
                    c: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      { t: '3', c: [] },
    ],
  },
  {
    t: '1',
    c: [
      { t: '2', c: [] },
      { t: '3', c: [] },
    ],
  },
]

// load all items in a
const loadAll = (a) => {
  a.forEach((item) => {
    console.log(item.t)
    loadAll(item.c)
  })
}

loadAll(a)
