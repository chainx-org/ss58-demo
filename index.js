import {Keyring, encodeAddress, decodeAddress} from  '@polkadot/keyring'
import {hexAddPrefix, u8aToHex, hexToU8a, isHex} from '@polkadot/util'

const keyring = new Keyring()
keyring.setSS58Format(44)

const _decodeAddress = (address) => {
  if (!address) return address
  return u8aToHex(decodeAddress(address))
}

const _encodeAddress = (publicKey) => {
  if (!publicKey) return publicKey
  return keyring.encodeAddress(hexAddPrefix(publicKey))
}

const selectAddress = (inputValue) => {
  if (inputValue.includes('0x') && inputValue.length === 66) {
    return encodeAddress(isHex(inputValue) ? hexToU8a(inputValue) : _encodeAddress(inputValue))
  } else if (inputValue.length === 48) {
     return _decodeAddress(inputValue)
  } else {
    return false
  }
}
console.log('public key:',selectAddress('5EWtScne4zWsGaP4gVo8DmLpChVx3MzoQTpKJCEdBTYDA1Dy'))
console.log('account:',selectAddress('0x6c707b1690a6b0e01b5dea252fe1887930a5afc0ec203f96705331749c37ae4a'))


