export const useFormatPrice = () => {
  const format = (price: number): string => {
    return price.toLocaleString('ru-RU') + ' ₸'
  }

  const discount = (price: number, oldPrice: number): number => {
    return Math.round(((oldPrice - price) / oldPrice) * 100)
  }

  return { format, discount }
}
