const IPFS = require('ipfs')
const node = new IPFS()
const data = JSON.stringify({
  title: "EthBerlinZwei",
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "EthBerlinZwei"
    },
    description: {
      type: "string",
      description: "ETHBerlinZwei is a hackathon, a culture festival, an educational event, a platform for hacktivism, and a community initiative to push the decentralized ecosystem forward. After a successful 2018 event, ETHBerlin decided to reaffirm its commitment with the ecosystem and founded the Department of Decentralization, responsible for initiatives that go beyond organizing a hackathon and seek to also support the projects coming from our events and community."
    },
    image: {
      type: "string",
      description: "https://ipfs.globalupload.io/QmNYCmZDcoEAFw7MgPMHDjVHLMxMpzC2v1SyqD69tqz5L4"
    }
  }
});

// once the node is ready
node.once('ready', () => {
  // convert your data to a Buffer and add it to IPFS
  node.add(IPFS.Buffer.from(data), (err, files) => {
    if (err) return console.error(err)

    // 'hash', known as CID, is a string uniquely addressing the data
    // and can be used to get it again. 'files' is an array because
    // 'add' supports multiple additions, but we only added one entry
    console.log(files[0].hash)
  })
})
