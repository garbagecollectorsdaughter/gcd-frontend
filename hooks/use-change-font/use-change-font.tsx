import { useContext } from 'react'
import { FontContext } from '@/context/FontContext'

export const useChangeFont = () => useContext(FontContext)
