import { useDispatch, useSelector } from "react-redux";
import s from './Table.module.css'
import { removeCardAction } from "../../store/tableSlice";

function Table() {

  const splitCardNumber = (cardNumber) => {
    let res = []
    for (let i = 0; i <= 12; i += 4) {
      res.push(cardNumber.slice(i, i + 4))
    }
    return res.join(' ')
  }

  const getValidThru = (m, y) => {
    let month = m.length < 2 ? `0${m}` : m
    let year = y.length < 2 ? `0${y}` : y
    return `${month}/${year}`
  }

  const encodeCvc = (cvc) => {
    return `**${cvc[2]}`
  }

  const tableData = useSelector((state) => state.table.value)
  const dispatch = useDispatch()
  return (
    <section >
      {tableData.length > 0 && 
      <div className={s.table_wrapper}>
        <table className={s.table_content}>
          <thead>
            <tr>
              <th className={s.table_header}>NAME</th>
              <th className={s.table_header}>CARD NUMBER</th>
              <th className={s.table_header}>EXPIRES</th>
              <th className={s.table_header}>CVC</th>
              <th className={s.delete_field}>DEL</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(card => 
              <tr key={card.id}>
                <td className={s.cardholder_cell}>{card.cardholder}</td>
                <td>{splitCardNumber(card.cardnumber)}</td>
                <td>{getValidThru(card.month, card.year)}</td>
                <td>{encodeCvc(card.cvc)}</td>
                <td ><span  className={s.del_field} onClick={(e) => {dispatch(removeCardAction(card.id))}}>&#10060;</span></td>
              </tr>  
              )}
          </tbody>
       </table>
       </div>}
    </section>
    
  )
}

export default Table;