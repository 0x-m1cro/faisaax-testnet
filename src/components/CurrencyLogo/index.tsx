import { Currency, Token } from '@uniswap/sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

//import EthereumLogo from '../../assets/images/ethereum-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

const getTokenLogoURL = () =>
  `https://raw.githubusercontent.com/faisaa-finance/faisaax-testnet/master/public/images/core_logo.svg`

// const StyledEthereumLogo = styled.img<{ size: string }>`
//   width: ${({ size }) => size};
//   height: ${({ size }) => size};
//   box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
//   border-radius: 24px;
// `

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    //if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL()]
      }

      return [getTokenLogoURL()]
    }
    return []
  }, [currency, uriLocations])

  // if (currency === ETHER) {
  //   <StyledLogo size={size} srcs={srcs} alt="token logo" style={style} />
  // }

  return <StyledLogo size={size} srcs={srcs} alt="token logo" style={style} />
}
