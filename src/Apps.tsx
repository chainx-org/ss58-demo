/** @format */
import {Input} from 'antd'
import React, {useState} from 'react'
import { decodeAddress, encodeAddress, Keyring } from '@polkadot/keyring';
import { hexAddPrefix, u8aToHex } from '@polkadot/util';
const {hexToU8a, isHex} = require('@polkadot/util')

const Apps = () => {
  const [originValue, setOriginValue] = useState('')
  const [formatValue, setFormatValue] = useState('')

// keyring.setSS58Format(process.env.REACT_APP_ENV === 'test' ? 42 : 44)
// 42 for testnet, 44 for mainnet
  const keyring = new Keyring()
  keyring.setSS58Format(44)

  const _decodeAddress = (address: string) => {
    if (!address) return address
    return u8aToHex(decodeAddress(address))
  }

  const _encodeAddress = (publicKey: string) => {
    if (!publicKey) return publicKey
    return keyring.encodeAddress(hexAddPrefix(publicKey))
  }

  const inputValue = (e: any) => {
    const value = e.target.value
    setOriginValue(value)
    selectAddress(value)
  }

  const selectAddress = (inputValue: string) => {
    if (inputValue.includes('0x') && inputValue.length === 66) {
      let recordResult = encodeAddress(isHex(inputValue) ? hexToU8a(inputValue) : _encodeAddress(inputValue))
      setFormatValue(recordResult)
    } else if (inputValue.length === 48) {
      const result = _decodeAddress(inputValue)
      setFormatValue(result)
    } else {
      return false
    }
  }

  return (
    <div>
      <Input placeholder="Basic usage" onChange={inputValue} />
      <div>input: {originValue}</div>
      <div>format: {formatValue}</div>
    </div>
  )
}

export default Apps
