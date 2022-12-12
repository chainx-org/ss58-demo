/** @format */
import {Input} from 'antd'
import React, {useState} from 'react'
import {encodeAddress} from '@polkadot/keyring'
import _encodeAddress from './encodeAddress'
import _decodeAddress from './decodeAddress'
const {hexToU8a, isHex} = require('@polkadot/util')

const Apps = () => {
  const [originValue, setOriginValue] = useState('')
  const [formatValue, setFormatValue] = useState('')
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
