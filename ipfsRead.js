const IPFS = require('ipfs')
const node = new IPFS()

node.once('ready', () => {
  node.cat('QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A', (err, data) => {
    if (err) return console.error(err)

    // convert Buffer back to string
    console.log(data.toString())
  })
})
