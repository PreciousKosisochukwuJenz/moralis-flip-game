const serverUrl = 'https://utnsxcmu6apo.usemoralis.com:2053/server'
const appId = 'eTNVL5OYmTQpNSkwsVLNxMDEc6eQXy70ltaXSDhI'

// Side Enumeration
const sides = Object.freeze({
  HEAD: 0,
  TAIL: 1,
})

const app = {
  contract: null,
  initialize: async (serverUrl, appId) => {
    Moralis.start({ serverUrl, appId })
    window.ethers = Moralis.web3Library
    const contractAddress = '0x39b2cb245E07871e7e03004d2984A30D4c078645'
    const provider = new window.ethers.providers.JsonRpcProvider()
    const signer = provider.getSigner()

    app.contract = new window.ethers.Contract(
      contractAddress,
      window.abi,
      signer,
    )

    app.initalizeListeners()
  },

  initalizeListeners: () => {
    document.getElementById('btn-login').onclick = () => {
      app.login()
    }
    document.getElementById('btn-logout').onclick = () => {
      app.logOut()
    }
    document.getElementById('play-head').onclick = () => {
      app.play('HEAD')
    }
    document.getElementById('play-tail').onclick = () => {
      app.play('TAIL')
    }
  },

  login: async () => {
    let user = Moralis.User.current()
    if (!user) {
      user = await Moralis.authenticate({
        signingMessage: 'Log in to Flip Game',
      })
        .then(function (user) {
          app.handleLoginClient(user)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    app.handleLoginClient(user)
  },

  handleLoginClient: (user) => {
    const account = user.get('ethAddress')
    document.getElementById('btn-login').style.display = 'none'
    document.getElementById('btn-logout').style.display = 'block'
    document.getElementById('address-display').style.display = 'block'
    document.getElementById('main').style.display = 'block'
    document.getElementById('address-display').innerHTML = account
  },

  logOut: async () => {
    await Moralis.User.logOut()

    document.getElementById('btn-login').style.display = 'block'
    document.getElementById('btn-logout').style.display = 'none'
    document.getElementById('address-display').style.display = 'none'
    document.getElementById('main').style.display = 'none'
    document.getElementById('address-display').innerHTML = ''
  },

  play: async (side) => {
    let sideNumber
    switch (side) {
      case sides.HEAD:
        sideNumber = sides.HEAD
        break
      case sides.TAIL:
        sideNumber = sideNumber.TAIL
        break
    }
    const amount = document.getElementById('amount').value
    app.contract.Flip(sideNumber, {
      value: amount,
      from: ethereum.selectedAddress,
    })
  },
}

// Initialize app
app.initialize(serverUrl, appId)
